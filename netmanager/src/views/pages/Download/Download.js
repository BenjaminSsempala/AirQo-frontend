import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import Select from "react-select";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { isEmpty } from "underscore";
import moment from "moment";
import { useDashboardSitesData } from "redux/Dashboard/selectors";
import { loadSites } from "redux/Dashboard/operations";
import { downloadDataApi } from "views/apis/analytics";
import { roundToStartOfDay, roundToEndOfDay } from "utils/dateTime";
import { updateMainAlert } from "redux/MainAlert/operations";
import { useInitScrollTop, usePollutantsOptions } from "utils/customHooks";
import ErrorBoundary from "views/ErrorBoundary/ErrorBoundary";

const { Parser } = require("json2csv");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const createSiteOptions = (sites) => {
  const options = [];
  sites.map((site) =>
    options.push({
      value: site._id,
      label: site.name || site.description || site.generated_name,
    })
  );
  return options;
};

const getValues = (options) => {
  const values = [];
  options.map((option) => values.push(option.value));
  return values;
};

const Download = (props) => {
  useInitScrollTop();
  const { className, staticContext, ...rest } = props;
  const classes = useStyles();

  const MAX_ALLOWED_DATE_DIFF_IN_DAYS = 93;

  const dispatch = useDispatch();
  const sites = useDashboardSitesData();
  const [siteOptions, setSiteOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSites, setSelectedSites] = useState([]);
  const [pollutants, setPollutants] = useState([]);
  const [frequency, setFrequency] = useState({
    value: "hourly",
    label: "Hourly",
  });
  const [fileType, setFileType] = useState(null);
  const [outputFormat, setOutputFormat] = useState(null);

  const frequencyOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "monthly", label: "Monthly" },
  ];

  const pollutantOptions = usePollutantsOptions();

  const typeOptions = [
    { value: "json", label: "JSON" },
    { value: "csv", label: "CSV" },
    //{ value: "aqcsv", label: "AQCSV" },
  ];

  const typeOutputFormatOptions = [
    { value: "aqcsv", label: "AQCSV" },
    { value: "usual", label: "Usual" },
  ];

  useEffect(() => {
    if (isEmpty(sites)) dispatch(loadSites());
  }, []);

  useEffect(() => {
    setSiteOptions(createSiteOptions(Object.values(sites)));
  }, [sites]);

  const disableDownloadBtn = () => {
    return (
      !(
        startDate &&
        endDate &&
        !isEmpty(selectedSites) &&
        !isEmpty(pollutants) &&
        fileType &&
        fileType.value &&
        frequency &&
        frequency.value
      ) || loading
    );
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let data = {
      sites: getValues(selectedSites),
      startDate: roundToStartOfDay(new Date(startDate).toISOString()),
      endDate: roundToEndOfDay(new Date(endDate).toISOString()),
      frequency: frequency.value,
      pollutants: getValues(pollutants),
      fileType: fileType.value,
      fromBigQuery: true,
      outputFormat: outputFormat.value,
    };

    // const dateDiff = moment(data.endDate).diff(moment(data.startDate), "days");
    //
    // if (dateDiff > MAX_ALLOWED_DATE_DIFF_IN_DAYS) {
    //   setLoading(false);
    //   dispatch(
    //     updateMainAlert({
    //       show: "true",
    //       message: "The download of data of more than 3 months is prohibited",
    //       severity: "error",
    //     })
    //   );
    //   return;
    // }

    await downloadDataApi(fileType.value, data, fileType.value === "csv" , outputFormat.value)
      .then((response) => response.data)
      .then((resData) => {
        let filename = `airquality-${frequency.value}-data.${fileType.value}`;
        if (fileType.value === "json") {
          let contentType = "application/json;charset=utf-8;";

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob(
              [decodeURIComponent(encodeURI(JSON.stringify(resData)))],
              { type: contentType }
            );
            navigator.msSaveOrOpenBlob(blob, filename);
          } else {
            var a = document.createElement("a");
            a.download = filename;
            a.href =
              "data:" +
              contentType +
              "," +
              encodeURIComponent(JSON.stringify(resData));
            a.target = "_blank";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        } else {
          const downloadUrl = window.URL.createObjectURL(resData);
          const link = document.createElement("a");

          link.href = downloadUrl;
          link.setAttribute("download", filename); //any other extension

          document.body.appendChild(link);

          link.click();
          link.remove();
        }
      })
      .catch((err) => {
        console.log(err && err.response && err.response.data);
        dispatch(
          updateMainAlert({
            show: true,
            message: "Unable to fetch data. Please try again",
            severity: "error",
          })
        );
      });
    setLoading(false);
  };

  const handleUrbanBetterFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let data = {
      startDate: roundToStartOfDay(new Date(startDate).toISOString()),
      endDate: roundToEndOfDay(new Date(endDate).toISOString()),
      device_numbers: getValues(deviceNumbers)
    };

    await downloadUrbanBetterDataApi(data)
      .then((resData) => {

        let filename = `airquality-data.${fileType.value}`;

        if(fileType.value === "csv"){
          const downloadUrl = window.URL.createObjectURL(new Blob([resData]));
          const link = document.createElement("a");
          
          link.href = downloadUrl;
          link.setAttribute("download", filename);
  
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else if(fileType.value === "json") {
          Papa.parse(resData, {
            header: true,
            complete: response => {
              setParsedCsvData(response.data)
            },
          });
          
          let contentType = "application/json;charset=utf-8;";
          
          var a = document.createElement("a");
          a.download = filename;
          a.href =
            "data:" +
            contentType +
            "," +
            encodeURIComponent(JSON.stringify(parsedCsvData));
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          dispatch(
            updateMainAlert({
              show: true,
              message: "Unsupported file type",
              severity: "error",
            })
          );
        }
        
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          updateMainAlert({
            show: true,
            message: "Unable to fetch data. Please try again",
            severity: "error",
          })
        );
      });
    setLoading(false);
    setStartDate(null);
    setEndDate(null);
    setFileType(null);
    setDeviceNumbers([]);
  }

  return (
    <ErrorBoundary>
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card
              {...rest}
              className={clsx(classes.root, className)}
              style={{ overflow: "visible" }}
            >
              <CardHeader
                subheader="Customize the data you want to download."
                title="Data Download"
              />

              <Divider />
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        label="Start Date"
                        className="reactSelect"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        onChange={(event) => setStartDate(event.target.value)}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <TextField
                        label="End Date"
                        className="reactSelect"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        onChange={(event) => setEndDate(event.target.value)}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        className="reactSelect"
                        name="location"
                        placeholder="Location(s)"
                        value={selectedSites}
                        options={siteOptions}
                        onChange={(options) => setSelectedSites(options)}
                        isMulti
                        variant="outlined"
                        margin="dense"
                        required
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Frequency"
                        className=""
                        name="chart-frequency"
                        placeholder="Frequency"
                        value={frequency}
                        options={frequencyOptions}
                        onChange={(options) => setFrequency(options)}
                        variant="outlined"
                        margin="dense"
                        isDisabled
                        required
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="Pollutant"
                        className="reactSelect"
                        name="pollutant"
                        placeholder="Pollutant(s)"
                        value={pollutants}
                        options={pollutantOptions}
                        onChange={(options) => setPollutants(options)}
                        isMulti
                        variant="outlined"
                        margin="dense"
                        required
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="File Type"
                        className="reactSelect"
                        name="file-type"
                        placeholder="File Type"
                        value={fileType}
                        options={typeOptions}
                        onChange={(options) => setFileType(options)}
                        variant="outlined"
                        margin="dense"
                        required
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Select
                        fullWidth
                        label="File Output Standard"
                        className="reactSelect"
                        name="file-output-format"
                        placeholder="File Output Standard"
                        value={outputFormat}
                        options={typeOutputFormatOptions}
                        onChange={(options) => setOutputFormat(options)}
                        variant="outlined"
                        margin="dense"
                        required
                      />
                    </Grid>
                  </Grid>
                </CardContent>

                <Divider />
                <CardActions>
                  <span style={{ position: "relative" }}>
                    <Button
                      color="primary"
                      variant="outlined"
                      type="submit"
                      disabled={disableDownloadBtn()}
                    >
                      {" "}
                      Download Data
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </span>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ErrorBoundary>
  );
};

Download.propTypes = {
  className: PropTypes.string,
};

export default Download;
