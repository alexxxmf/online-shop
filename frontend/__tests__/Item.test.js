import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
    id: 'ABC123',
    title: 'This is a cool item',
    price: 500,
    description: 'Something really cool',
    image: 'cool.jpg',
    largeImage: 'cool-xl.jpg'
};

describe('<Item />', () => {
    it('renders the image properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const img = wrapper.find('img');
        expect(img.props().src).toBe(fakeItem.image);
        expect(img.props().alt).toBe(fakeItem.title);
    });

    it('renders the pricetag and title', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);

        const PriceTag = wrapper.find('PriceTag');

        expect(PriceTag.children().text()).toBe('$5')

        expect(wrapper.find('Title a').text()).toBe(fakeItem.title)
    });

    it('renders out the buttons properly', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        const buttonList = wrapper.find('.buttonList');

        expect(buttonList.find('Link').exists()).toBe(true);
        expect(buttonList.find('AddToCart').exists()).toBe(true);
        expect(buttonList.find('DeleteItem').exists()).toBe(true);
    });
});