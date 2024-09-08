import { connect } from 'react-redux';
import RootLayout from './features/Layout';

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(RootLayout);
