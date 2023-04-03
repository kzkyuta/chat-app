import React from 'react';
import {useAuthUserContext} from '../providers';
import {Navigate} from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  redirect: string;
};

export const RouteAuthGuard: React.FC<Props> = props => {
  const authUser = useAuthUserContext().user;
  if (!authUser) {
    return <Navigate to={props.redirect} replace={true}></Navigate>;
  }
  return <>{props.children}</>;
};
