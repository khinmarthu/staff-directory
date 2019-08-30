import React, { useState, useEffect, useCallback } from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { EMPLOYEE_URL } from "../../constants/api";
import { fetchData } from "../../common/utils";
import { Wrapper } from '../styled';
import { map, get, isEmpty } from 'lodash';
import { Tree, TreeNode } from 'react-organizational-chart';

const { Title, Paragraph, Text } = Typography;

const EmptySubordinates = styled('div')`
  text-align: center;
`;

const Overview = props => {
  const {
    match: {
      params: { employeeName }
    }
  } = props;
  const [subordinates, setSubordinates] = useState([]);

  const fetchSubordinate = async (curSubordinate) => {
    const url = `${EMPLOYEE_URL}${curSubordinate}`;
    try {
      const response = await fetchData(url);
      return get(response, '[1].direct-subordinates');
    }
    catch (error) {
      console.log("error: ", error);
    }
  };

  const getResult = useCallback(async(curEmployeeName) => {
    const curSubordinates = await fetchSubordinate(curEmployeeName);

    let curEmployeeNameResult = {
      label: curEmployeeName
    };

    if (curSubordinates) {
      const curSubordinatesPromises = map(curSubordinates, (curSubordinate) => getResult(curSubordinate));
      const curSubordinateResult = await Promise.all(curSubordinatesPromises);
      
      curEmployeeNameResult = Object.assign({}, curEmployeeNameResult, {children: curSubordinateResult});
    }
    return curEmployeeNameResult;
  }, []); 

  useEffect(() => {
    const getSubordinates = async () => {
      const result = await getResult(employeeName);
      const subordinates = get(result, 'children');
      const allSubordinate = (subordinates && [{
        label: employeeName,
        children: subordinates,
      }]) || [];
      setSubordinates(allSubordinate);
    };

    getSubordinates();
  }, [employeeName, getResult]);

  const renderTree = (data, init = false) => map(data, item => {
    let Node = TreeNode;
    let children = [];
    if (init) {
      Node = Tree;
    }
    if (item.children) {
      children = renderTree(item.children);
    }
    return <Node key={item.label} label={item.label} children={children} />;
  });

  const renderEmpty = () => {
    return (
      <EmptySubordinates>No Subordinates</EmptySubordinates>
    );
  };

  return (
    <>
      <Wrapper>
        <Title level={3}>Employee Overview</Title>
        <Paragraph>Subordinates of employee <Text strong>{employeeName}</Text></Paragraph>
        {isEmpty(subordinates)? renderEmpty() : renderTree(subordinates, true)}
      </Wrapper>
    </>
  );
};

export default Overview;
