import React from 'react';
import Page from './Page';
import Hero from '../components/Hero';
import Monitor from '../components/Monitor';
import TopBar from '../components/nav/TopBar';
import GetApp from '../components/get-app/GetApp';
import MapSection from '../components/MapSection/MapSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { AnalyticsSection } from '../components/AnalyticsSection';

const HomePage = () => (
    <Page>
        <div className="HomePage">
            <TopBar />
            <Hero />
            <Monitor />
            <AnalyticsSection />
            <MapSection />
            <GetApp />
            <NewsletterSection />
        </div>
    </Page>
);

export default HomePage;
