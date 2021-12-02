import App, {Container} from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
    /*
    So basically the point here is leveraging on SSR capabilities of Next.js. With getInitialPrfops
    we want to crawl all the pages, fetch the data we need and then pass it to the initial render
    so we can have it both in client and server (next does that apparently)
    Also this is the standard lifecycle method in next for this to do the heavylifting,
    that's why we avoid componentDidMount I suppose
    */
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        pageProps.query = ctx.query;
        return { pageProps }
    }

    render() {
        const { Component, apollo, pageProps } = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(MyApp);