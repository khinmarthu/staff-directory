import React, { useState } from "react";
import styled from "styled-components";
import { Button, AutoComplete, Typography } from "antd";
import { isEqual, uniq, without, map } from "lodash";
import { Wrapper } from '../styled';

const { Title } = Typography;
const { Option } = AutoComplete;

const SearchInput = styled(AutoComplete)`
  margin-right: 10px;
`;

const History = styled('div')`
  display: flex;
`;

const HistoryText = styled('span')`
  flex: auto;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RemoveHistory = styled('span')`
  flex: none;
`;

const initHistoryList = () => {
  const oldHistoryList =
    localStorage.getItem("history") &&
    JSON.parse(localStorage.getItem("history"));
  return oldHistoryList;
};

const Home = props => {
  const { history } = props;
  const [employeeName, setEmployeeName] = useState("");
  const [historyList, setHistoryList] = useState(initHistoryList());

  const displayHistoryList = (history) => {
    return (
      <Option key={history} text={history}>
        <History>
          <HistoryText>{history}</HistoryText>
          <RemoveHistory>
            <Button onClick={(event) => handleRemoveHistory(event, history)} >remove</Button>
          </RemoveHistory>
        </History>
      </Option>
    );
  };

  const handleRemoveHistory = (event, historyValue) => {
    event.stopPropagation();
    event.preventDefault();
    const newHistoryList = removeHistoryList(historyValue);
    setUpdatedHistoryList(newHistoryList);
  };
  
  const removeHistoryList = (historyValue) => {
    if (localStorage.getItem("history")) {
      const oldHistoryList = JSON.parse(localStorage.getItem("history"));
      const history = without(oldHistoryList, historyValue);
      return history;
    }
  };

  const handleSearchEmployee = event => {
    event.preventDefault();
    if (!employeeName) return;
    const newHistoryList = addHistoryList();
    setUpdatedHistoryList(newHistoryList);
    history.push(`/overview/${employeeName}`);
  };

  const addHistoryList = () => {
    if (localStorage.getItem("history")) {
      const oldHistoryList = JSON.parse(localStorage.getItem("history"));
      return uniq([...oldHistoryList, employeeName]);
    }

    return [employeeName];
  };

  const setUpdatedHistoryList = (newHistoryList) => {
    if (!isEqual(newHistoryList, historyList)) {
      localStorage.setItem("history", JSON.stringify(newHistoryList));
      setHistoryList(newHistoryList);
    }
  };

  return (
    <>
      <Wrapper>
        <Title level={3}>Employee Explorer</Title>
        <form onSubmit={handleSearchEmployee}>
          <SearchInput
            allowClear
            dataSource={map(historyList, displayHistoryList)}
            style={{ width: 400 }}
            onSelect={value => setEmployeeName(value)}
            onChange={value => setEmployeeName(value)}
            placeholder="Please enter employee name here"
            optionLabelProp="text"
          />
          <Button htmlType="submit" type="primary" icon="search">
            Search
          </Button>
        </form>
      </Wrapper>
    </>
  );
};

export default Home;
