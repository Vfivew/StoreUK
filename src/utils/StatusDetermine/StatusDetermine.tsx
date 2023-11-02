import React from "react";
import Loading from "../Loading/Loading";

interface StatusDetermineProps {
  isLoading: boolean;
  isError: boolean;
  data: any;
}

const StatusDetermine: React.FC<StatusDetermineProps> = ({ isLoading, isError, data }) => {
  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div>Помилка завантаження</div>;
  }

  if (!data) {
    return <div>Немає даних</div>;
  }

  return null;
};

export default StatusDetermine;
