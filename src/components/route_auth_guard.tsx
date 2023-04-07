import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuthContext} from '../providers/auth_context';

type Props = {
  children: React.ReactNode;
  redirect: string;
};

export const RouteAuthGuard: React.FC<Props> = props => {
  const authUser = useAuthContext();
  if (!authUser) {
    return <Navigate to={props.redirect} replace={true}></Navigate>;
  }
  return <>{props.children}</>;
};
