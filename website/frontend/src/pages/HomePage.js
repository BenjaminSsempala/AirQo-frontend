import React from 'react';
import PlaceHolder from 'icons/homepage/PlaceHolder';
import Google from 'icons/homepage/partners/google.svg';
import WorldBankGroup from 'icons/homepage/partners/worldbankgroup.svg';
import BirminghamUniversity from 'icons/homepage/partners/birmingham-university.svg';
import Zindi from 'icons/homepage/partners/zindi.svg';
import ESPRC from 'icons/homepage/partners/EPSRC.svg';
import NRF from 'icons/homepage/partners/NRF.svg';
import ColumbiaUniversity from 'icons/homepage/partners/columbia-university.svg';
import ASAP from 'icons/homepage/partners/ASAP.svg';
import Sensor from 'icons/homepage/sensor.svg';
import Checked from 'icons/homepage/checked.svg';
import UnChecked from 'icons/homepage/unchecked.svg';
import PlaceHolderLong from 'icons/homepage/placeholder_long.svg';
import ArrowRight from 'icons/homepage/arrow-right.svg';
import MapIcon from 'icons/homepage/map.svg';
import AppleStore from 'icons/homepage/apple-store.svg';
import GoogleStore from 'icons/homepage/google-play.svg';
import PlaceholderMeduim from 'icons/homepage/placeholder-medium.svg';
import NavTab from '../components/nav/NavTab';

const Icon = ({ icon }) => (
        <div className="icon">{icon}</div>
);

const Intro = () => (
        <div className="intro-container">
            <div className="container">
                <div className="text-container">
                    <div className="text-primary">Clean Air for all African Cities </div>
                    <div className="text-secondary">We empower communities with accurate, hyperlocal and timely air quality data to drive air pollution mitigation actions.</div>
                    <div className="btn-container">
                        <NavTab text="Get the App — It’s free" width={236} hideArrow filled style={{ marginRight: '17px' }} />
                        <NavTab text="Get involved" width={160} hideArrow colored />
                    </div>
                </div>
                <PlaceHolder />
            </div>
        </div>
);

const AirQuality = () => (
        <div className="air-quality-section">
            <div className="text-primary">Air quality analytics for all</div>
            <div className="text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
            <div className="category">
                <div>For African cities</div>
                <div>For Individuals</div>
            </div>
            <div className="content">
                <div className="content-container">
                    <div className="detail-wrapper-selected">
                        <div className="circle" />
                        <div className="text-wrapper">
                            <div>Realiable Air quality monitoring</div>
                            <div>
                                <Checked width={10} height={10} />
                                <div>Low-cost air quality sensors</div>
                            </div>
                            <div>
                                <Checked width={10} height={10} />
                                <div>93% tested sensor uptime</div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-wrapper">
                       <div className="circle" />
                       <div className="text-wrapper">
                            <div>Accurate Air quality analytics</div>
                            <div>
                                <UnChecked width={10} height={10} />
                                <div>Low-cost air quality sensors</div>
                            </div>
                            <div>
                                <UnChecked width={10} height={10} />
                                <div>93% tested sensor uptime</div>
                            </div>
                       </div>
                    </div>
                    <div className="detail-wrapper">
                        <div className="circle" />
                        <div className="text-wrapper">
                            <div>Robust API intergration</div>
                            <div>
                                <UnChecked width={10} height={10} />
                                <div>Low-cost air quality sensors</div>
                            </div>
                            <div>
                                <UnChecked width={10} height={10} />
                                <div>93% tested sensor uptime</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-container">
                    <Sensor width={464} height={376} />
                </div>
                <div className="floating-image" />
            </div>
        </div>
);

const Partners = () => (
        <div className="partner-section">
            <div>
                <div className="text">Our Partners</div>
                <div className="icon-wrapper">
                    <Icon icon={<Google height={76} width={164} />} />
                    <Icon icon={<WorldBankGroup width={124} height={124} />} />
                    <Icon icon={<BirminghamUniversity width={220} height={102} />} />
                    <Icon icon={<Zindi width={220} height={102} />} />
                    <Icon icon={<ESPRC width={192} height={90} />} />
                    <Icon icon={<NRF width={234} height={108} />} />
                    <Icon icon={<ColumbiaUniversity width={220} height={102} />} />
                    <Icon icon={<ASAP width={220} height={102} />} />
                </div>
            </div>
        </div>
);

const Newsletter = () => (
        <div className="subscribe-container">
            <div className="text-primary">Get air quality updates!</div>
            <div className="text-secondary">Subscribe to our newsletter and learn about the quality of the air you are breathing</div>
            <div className="btn-container">
                <div className="input"><div className="text">Enter email</div></div>
                <div className="button">Subscribe</div>
            </div>
        </div>
);

const AirQoAPI = () => (
        <div className="api-section">
            <div className="content-api">
                <div className="api-title">AirQo API</div>
                <div className="api-text-main">Access air quality data through our API</div>
                <div className="api-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                <div className="api-demo">Request a Demo <ArrowRight width={15} height={10} style={{ marginLeft: '8px' }} /></div>
                <div className="api-details-wrapper">
                    <div className="api-details">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>
                        <div className="api-details-text-primary">We use low-cost technologies </div>
                        <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                    </div>
                    <div className="api-details">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>
                        <div className="api-details-text-primary">We use low-cost technologies </div>
                        <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                    </div>
                </div>
            </div>
            <PlaceHolderLong height={668} width={520} />
        </div>
);

const AirQoAnalytics = () => (
        <div className="analytics-section">
            <div className="content-api">
                <div className="api-title">AirQo Analytics</div>
                <div className="api-text-main">Access air quality data through our API</div>
                <div className="api-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                <div className="api-demo">Request a Demo <ArrowRight width={15} height={10} style={{ marginLeft: '8px' }} /></div>
                <div className="api-details-wrapper-long">
                    <div className="api-details-long mb-24">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>

                        <div className="api-details-body-wrapper">
                            <div className="api-details-text-primary">We use low-cost technologies </div>
                            <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African </div>
                        </div>
                    </div>
                    <div className="api-details-long">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>

                        <div className="api-details-body-wrapper">
                            <div className="api-details-text-primary">We use low-cost technologies </div>
                            <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African </div>
                        </div>
                    </div>
                </div>
            </div>
            <PlaceHolderLong height={668} width={520} />
        </div>
);

const Map = () => (
        <div className="map-section">
            <div className="content-map">
                <div className="map-title">Monitor by map </div>
                <div className="map-text-main">Leverage our wide reach in Ugandan cities.</div>
                <div className="map-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                <div className="map-demo">View the map <ArrowRight width={15} height={10} style={{ marginLeft: '8px' }} /></div>
            </div>
            <div className="map-container">
                <MapIcon className="airqo-map" height={536} width={633} />
                <div className="map-label">
                    <div className="value">50</div>
                    <div>
                        <span className="location">Kampala</span>
                        <span className="region">Central Region, Uganda</span>
                        <span className="category">Good</span>
                    </div>
                </div>
            </div>
        </div>
);

const AirQoMonitor = () => (
        <div className="monitor-section">
            <div className="content-api">
                <div className="api-title">AirQo Monitors</div>
                <div className="api-text-main">Access air quality data through our API</div>
                <div className="api-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                <div className="api-demo">Request a Demo <ArrowRight width={15} height={10} style={{ marginLeft: '8px' }} /></div>
                <div className="api-details-wrapper">
                    <div className="api-details bg-light">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>
                        <div className="api-details-text-primary">We use low-cost technologies </div>
                        <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                    </div>
                    <div className="api-details">
                        <div className="api-circle-wrapper">
                            <div className="api-circle" />
                        </div>
                        <div className="api-details-text-primary">We use low-cost technologies </div>
                        <div className="api-details-text-secondary">We use low-cost technologies and Artificial intelligence to close the gaps in air quality data across the African continent. </div>
                    </div>
                </div>
            </div>
            <PlaceHolderLong height={668} width={520} />
        </div>
);

const GetApp = () => (
        <div className="get-app-section">
            <div className="content">
                <div className="main">Get the App</div>
                <div className="secondary">Discover the quality of the air you are breathing</div>
                <div>
                    <AppleStore className="icon-mr-32" height={60.44} width={178.14} />
                    <GoogleStore height={60.44} width={178.14} />
                </div>
            </div>
            <PlaceholderMeduim className="placeholder" height={562} width={346} />
        </div>
);

const HomePage = () => (
    <div className="HomePage">
        <Intro />
        <AirQuality />
        <AirQoAPI />
        <AirQoAnalytics />
        <Map />
        <AirQoMonitor />
        <GetApp />
        <Partners />
        <Newsletter />
    </div>
);

export default HomePage;
