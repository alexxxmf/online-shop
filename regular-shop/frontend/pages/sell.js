// Next.js takes care of the imports at page level so
// react is implicitly accesible
import CreateItem from '../components/CreateItem';
import PleaseSignin from '../components/PleaseSignin';

const Sell = props => (
  <div>
    <PleaseSignin>
      <CreateItem />
    </PleaseSignin>
  </div>
);

export default Sell;