import {listMyChartByPageUsingPOST} from '@/services/fyzbi/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  List,
  message,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Upload
} from 'antd'
import Search from "antd/es/input/Search";
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import { useModel } from '@@/exports';
/**
 * 图表列表页面
 * @constructor
 */
const ChartList: React.FC = () => {
  // 定义一个初始化的数据
  const initRequestParams = {
    // chartType: "",
    current: 1,
    // goal: "",
    name: "",
    pageSize: 10,
  }
  // 获取当前登陆用户
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};


  // 定义一个查询的参数
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initRequestParams});
// 定义一个loading
  const [loading, setLoading] = useState<boolean>(false);

  // 定义一个初始化的组数 用来存放数据
  const [chartList, setChartList] = useState<API.Chart[]>();
  // 定义一个总数 用于分页显示
  const [total, setTotal] = useState<number>(0);
  // 发送请求获取数据
  const getChartList = async () => {
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res.code == 200) {
        // @ts-ignore
        setChartList(res.data.records ?? []);
        // @ts-ignore
        setTotal(res.data.total ?? 0)
      } else {
        message.error('获取图表列表失败')
      }
    } catch (e: any) {
      message.error('获取图表列表失败', e.message)
    }


  }




// 页面加载完成后发送请求
  useEffect(() => {
      getChartList();
    }
    // 数据发生变化的时候 重新触发该函数
    , [searchParams]);

  return (
    <div className="chart-list">
      <div>
        <Search placeholder="请输入图表名称" enterButton loading={loading} onSearch={(value) => {
          // 设置搜索条件
          setSearchParams({
            ...initRequestParams,
            name: value,
          })
        }}/>
      </div>
      <Divider />
      <div className="margin-16" />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        pagination={{
          onChange: (page, pageSize) => {
            setSearchParams({
              ...searchParams,
              current: page,
              pageSize,
            })
          },
          current: searchParams.current,
          pageSize: searchParams.pageSize,
          total: total,
        }}
        loading={loading}
        dataSource={chartList}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card style={{ width: '100%' }}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar} />}
                title={item.name}
                description={item.chartType ? '图表类型：' + item.chartType : undefined}
              />

              <>
                {
                  item.status === 'wait' && <>
                    <Result
                      status="warning"
                      title="待生成"
                      subTitle={item.execMessage ?? '当前图表生成队列繁忙，请耐心等候'}
                    />
                  </>
                }
                {
                  item.status === 'running' && <>
                    <Result
                      status="info"
                      title="图表生成中"
                      subTitle={item.execMessage}
                    />
                  </>
                }
                {
                  item.status === 'succeed' && <>
                    <div style={{ marginBottom: 16 }} />
                    <p>{'分析目标：' + item.goal}</p>
                    <div style={{ marginBottom: 16 }} />
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)} />
                  </>
                }
                {
                  item.status === 'failed' && <>
                    <Result
                      status="error"
                      title="图表生成失败"
                      subTitle={item.execMessage}
                    />
                  </>
                }
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default ChartList;
