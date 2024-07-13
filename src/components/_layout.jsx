import { connect } from 'react-redux';
import RootLayout from './features/layout';

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(RootLayout);
