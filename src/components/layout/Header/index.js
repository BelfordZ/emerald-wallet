import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Header from './header';
import screen from '../../../store/wallet/screen';

export default muiThemeable()(connect(
  (state, ownProps) => {
    const showProgress = state.launcher.getIn(['geth', 'type']) === 'local';
    const curBlock = state.network.getIn(['currentBlock', 'height'], -1);
    const tip = state.network.getIn(['sync', 'highestBlock'], -1);
    const progress = (curBlock / tip) * 100;
    const invalidNumber = Number.isNaN(progress) || (!Number.isFinite(progress));

    return {
      network: state.network.toJS(),
      backScreen: state.wallet.screen.toJS().screen,
      showProgress: showProgress && !invalidNumber,
      progress: invalidNumber ? 0 : progress,
      tip,
    };
  },
  (dispatch, ownProps) => ({
    openSettings: (backScreen) => {
      dispatch(screen.actions.gotoScreen('settings', backScreen));
    },
  })
)(Header));

