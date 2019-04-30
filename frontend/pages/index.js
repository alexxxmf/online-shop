import Items from '../components/Items';
// Next.js takes care of the imports at page level for react library so
// react is implicitly accesible

// Next.js automatically wraps your pages into App component.
// This can be override... This is good if we want to persist state
// between opages
const Home = (props) => (
    <div>
        <Items page={2} />
    </div>
)

export default Home;