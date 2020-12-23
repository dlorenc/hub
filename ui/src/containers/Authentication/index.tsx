import React from 'react';
import GitHubLogin from 'react-github-login';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
  Card,
  CardBody,
  CardHeader
} from '@patternfly/react-core';
import { GH_CLIENT_ID } from '../../config/constants';
import { useMst } from '../../store/root';
import { AuthCodeProps } from '../../store/auth';
import { Icons } from '../../common/icons';
import Icon from '../../components/Icon';
import './Authentication.css';

const Authentication: React.FC = observer(() => {
  const history = useHistory();
  const refreshPage = () => {
    history.push('/');
    window.location.reload();
  };

  const { user } = useMst();
  const onSuccess = (code: AuthCodeProps) => {
    user.authenticate(code, refreshPage);
  };

  return (
    <React.Fragment>
      <Card className="hub-authentication-card__size">
        <CardHeader className="hub-authentication-card__header">
          <Icon id={Icons.Github} size="lg" label={'github'} />
        </CardHeader>
        <CardBody className="hub-authentication-card__body">
          <GitHubLogin
            clientId={GH_CLIENT_ID}
            redirectUri=""
            onSuccess={onSuccess}
            onFailure={user.onFailure}
          />
        </CardBody>
      </Card>
      {user.authErr ? (
        <AlertGroup isToast className="hub-authentication-alert">
          <Alert
            isLiveRegion
            variant="info"
            title="Authentication Failed! Please Login Again!"
            actionClose={
              <AlertActionCloseButton
                onClose={() => {
                  history.push('/login');
                  window.location.reload();
                }}
              />
            }
          ></Alert>
        </AlertGroup>
      ) : null}
    </React.Fragment>
  );
});

export default Authentication;
