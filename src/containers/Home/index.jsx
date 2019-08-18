import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';

const { Title } = Typography;

const Home = (props) => {
  const { history } = props;
  const [employeeName, setEmployeeName] = useState(''); 

  const handleSearchEmployee = (event) => {
    event.preventDefault();
    history.push(`/overview/${employeeName}`);
  };

  return (
    <>
      <form onSubmit={handleSearchEmployee}>
        <Title level={4}>Employee Explorer</Title>
        <Input value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} placeholder="Employee name" />
        <Button htmlType="submit" type="primary" icon="search">
          Search
        </Button>
      </form>
    </>
  );
};

export default Home;
