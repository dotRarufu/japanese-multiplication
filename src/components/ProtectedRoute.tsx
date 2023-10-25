import { ReactNode } from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import {
  LevelCategory,
  getLatestCategory,
  getLatestLevel,
} from '../services/level';

type Props = {
  children?: ReactNode;
  redirectPath: string;
};

const isLevelOpen = (targetCategory: LevelCategory, targetLevel: number) => {
  const categories = getLatestCategory();
  // const latestCategory = categories[categories.length - 1] as LevelCategory;
  const level = getLatestLevel(targetCategory);

  if (!categories.includes(targetCategory)) return false;

  if (targetLevel > level) return false;

  return true;
};

const ProtectedRoute = ({ redirectPath, children }: Props) => {
  const { number, category } = useParams();

  const isAllowed = isLevelOpen(category as LevelCategory, Number(number));

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
