import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from '../lib/testUtils';

/**
 * This is actualli a really good example to see the differences between shallow
 * and moount
 * 
 * const wrapper = shallow(<SingleItem id="123"/>)
 * console.log(wrapper.debug())
 * returns just one level deep
 * 
 * if we try mounting it will fail because we need to wrap the component in a provider
 * 
 */

describe('<SingleItem/>', () => {
    it('renders with proper data', async () => {
        const mocks = [
            {
              // when someone makes a request with this query and variable combo
              request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
              // return this fake data (mocked data)
              result: {
                data: {
                  item: fakeItem(),
                },
              },
            },
        ];
        // more info on the mocked provider here:
        // https://www.apollographql.com/docs/react/recipes/testing#mockedprovider
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <SingleItem id="123"/>
            </MockedProvider>
        )
        expect(wrapper.text()).toContain('Loading...');
        await wait();
        // this forces a re-render: https://airbnb.io/enzyme/docs/api/ShallowWrapper/update.html
        // for some reason without the await wait(0) the re-render still shows loading...
        wrapper.update();
        // toJson is a serializer to turn Enzyme wrappers into something compatible with Jest

        expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();

        expect(toJSON(wrapper.find('img'))).toMatchSnapshot();

        expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
    });

    it('Errors with a not found item', async () => {
        const mocks = [
            {
              // when someone makes a request with this query and variable combo
              request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
              // return this fake data (mocked data)
              result: {
                errors: [ { message: 'Items not found!' } ]
              },
            },
        ];
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <SingleItem id="123"/>
            </MockedProvider>
        )
        await wait();
        wrapper.update();

        const item = wrapper.find('[data-test="graphql-error"]')
        expect(item.text()).toContain('Items not found!');
        expect(toJSON(item)).toMatchSnapshot();
    });
})