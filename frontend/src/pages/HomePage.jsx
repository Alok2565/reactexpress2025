import React from 'react'
import HomeSlider from '../components/HomeSlider'
import { Helmet } from 'react-helmet'
import { useProject } from '../ProjectContext';

function HomePage() {
    const { title } = useProject();
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`Home | ${title}`}</title>
            </Helmet>
            <div><HomeSlider /></div>
            <div>
                <section className="introduction padd-25">
                    <div className="container py-2">
                        <div className="row intro">
                            <div className="col-md-12">

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default HomePage
