// for representing chained operations using redux-thunk
import {
  LOAD_PM25_HEATMAP_DATA_SUCCESS,
  LOAD_PM25_HEATMAP_DATA_FAILURE,
  LOAD_PM25_SENSOR_DATA_SUCCESS,
  LOAD_PM25_SENSOR_DATA_FAILURE,
  LOAD_MAP_EVENTS_SUCCESS,
  LOAD_MAP_EVENTS_FAILURE,
} from "./actions";
import { heatmapPredictApi } from "views/apis/predict";
import { getMonitoringSitesInfoApi } from "views/apis/analytics";
import { transformDataToGeoJson } from "views/pages/Map/utils";
import { getEventsApi } from "views/apis/deviceRegistry";

export const loadPM25HeatMapData = () => async (dispatch) => {
  return await heatmapPredictApi()
    .then((responseData) => {
      const res = responseData.data.predictions
      const payload = res;
      dispatch({
        type: LOAD_PM25_HEATMAP_DATA_SUCCESS,
        payload
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_PM25_HEATMAP_DATA_FAILURE
      });
    });
};

export const loadPM25SensorData = () => async (dispatch) => {
  return await getMonitoringSitesInfoApi('')
    .then((responseData) => {
      const payload = transformDataToGeoJson(responseData.airquality_monitoring_sites, {
        longitude: 'Longitude',
        latitude: 'Latitude'
      });
      dispatch({
        type: LOAD_PM25_SENSOR_DATA_SUCCESS,
        payload
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_PM25_SENSOR_DATA_FAILURE
      });
    });
};

export const loadMapEventsData = (params) => async (dispatch) => {
  return await getEventsApi(params)
    .then((responseData) => {
      const payload = transformDataToGeoJson(
        responseData.measurements,
        {
          longitude: 'Longitude',
          latitude: 'Latitude'
        },
        (feature) => [
          feature.siteDetails && feature.siteDetails.longitude,
          feature.siteDetails && feature.siteDetails.latitude
        ]
      );

      dispatch({
        type: LOAD_MAP_EVENTS_SUCCESS,
        payload
      });
    })
    .catch(() => {
      dispatch({
        type: LOAD_MAP_EVENTS_FAILURE
      });
    });
};
