import React from 'react';
import Page from '../Page';
import { useInitScrollTop } from 'utils/customHooks';
import Header from '../../components/OurProducts/Header';
import NavTab from '../../components/nav/NavTab';
import HeaderImage from '../../assets/img/OurProducts/Api/HeaderImage.png';
import Section1Image from '../../assets/img/OurProducts/Api/section-1.jpg';
import Section2Image from '../../assets/img/OurProducts/Api/section-2.png';
import Section3Image from '../../assets/img/OurProducts/Api/section-3.png';

const ApiPage = () => {
  useInitScrollTop();
  return (
    <Page>
      <div className="product-page api mobile-app analytics">
        <div></div>
        <Header
          style={{ backgroundColor: '#FFFDEA' }}
          pageTitle={'AirQo API'}
          title={'AirQo’s Application Programming Interface.'}
          subText={
            ' Are you a developer? We invite you to access and leverage our open-air quality data on your Application. '
          }>
          <img src={HeaderImage} alt="" style={{ borderRadius: '8px' }} />
        </Header>
        <div className="content">
          <div className="grid-wrapper column section section-1">
            <div className="row">
              <h2 className="left title">
                Access Raw and Calibrated <span className="blue">Data</span>
              </h2>
              <p className="right">
                The AirQo API is free to use and gives you access to historical, real-time and forecast
                raw and calibrated air quality data to further air quality awareness across Africa.
                The API enables seamless integration with software applications and provides access
                to raw data for various use cases.
              </p>
            </div>
            <div className="overlap-section">
              <div className="lapping-left card larger-top" style={{ backgroundColor: '#F2F1F6' }}>
                <h5>How it works</h5>
                <p>
                  The API allows registered users to extract their own data or incorporate it
                  into their systems without having to go through the data master process.
                  <br />
                  <br /> Our free API enables seamless integration with applications and can be used in Open Source Projects, Browser
                  Extensions, Plugins, Mobile Apps, Desktop and Web Apps, and so forth.
                </p>
              </div>
              <div className="lapping-left image" id="section-1">
                <img src={Section1Image} alt="" />
              </div>
            </div>
          </div>
          <div className="grid-wrapper section">
            <div className="overlap-section">
              <div className="lapping-right card larger-top" style={{ backgroundColor: '#FFFCE1' }}>
                <h5>Did you know?</h5>
                <p>
                  93 developers across the globe use data from our API. Our continuous air quality
                  data calibration process and real time monitoring ensures that we provide the most
                  reliable air quality information across Africa.
                  <br /> <br />
                  Highly accurate air quality information at your fingertips, through the AirQo API.
                </p>
              </div>
              <div className="lapping-right image" id="section-2">
                <img src={Section2Image} alt="" />
              </div>
            </div>
          </div>
          <div
            className="grid-full column section landscape-section"
            id="section-3"
            style={{ backgroundColor: '#F2F1F6' }}>
            <div className="column smaller-width">
              <h2 className="left title">
                <span className="blue">API</span> Documentation
              </h2>
              <p className="right">
                We invite you to leverage our open-air quality data in your App. Amplify air quality
                impact through our API.
              </p>
              <div className='cta-button'>
                <NavTab
                  text="Read Docs"
                  path="https://docs.airqo.net/airqo-rest-api-documentation/"
                  externalLink
                  hideArrow
                  filled
                />
              </div>
            </div>
            <div className="image">
              <img src={Section3Image} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ApiPage;
