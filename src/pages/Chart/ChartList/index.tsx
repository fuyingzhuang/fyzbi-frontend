import {getAnalyzeRawData, listMyChartByPageUsingPOST} from '@/services/fyzbi/chartController';
import {EyeOutlined, UploadOutlined} from '@ant-design/icons';
import {
  Avatar, Button,
  Card,
  Divider,
  List,
  message, Modal,
  Result,
} from 'antd'
import Search from "antd/es/input/Search";
import TextArea from 'antd/es/input/TextArea';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {useModel} from '@@/exports';

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
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};


  // 定义一个查询的参数
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initRequestParams});
// 定义一个loading
  const [loading, setLoading] = useState<boolean>(false);
// 定义一个原始数据对话框是否显示


  // 定义一个初始化的组数 用来存放数据
  const [chartList, setChartList] = useState<API.Chart[]>();

  // 定义一个保存原始数据的对象
  const [rawData, setRawData] = useState<string>();
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
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  // 定义一个方法 用来根据id查询图表的原始数据
  const getChartOriginData = async (id: number) => {
    try {
      const res = await getAnalyzeRawData({id: id});
      if (res.code == 200) {
        // @ts-ignore
       setRawData(res.data)
      } else {
        message.error('获取图表原始数据失败')
      }
    } catch (e: any) {
      message.error('获取图表原始数据失败', e.message)
    }
  }



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
      <Divider/>
      <div className="margin-16"/>
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
            <Card style={{width: '100%'}}>
              <List.Item.Meta
                avatar={<Avatar src={currentUser && currentUser.userAvatar}/>}
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
                    <div style={{marginBottom: 16}}/>
                    <p>{'分析目标：' + item.goal}</p>
                    {/*分析结论*/}
                    <p>{'分析结论：' + item.genResult}</p>
                    <div style={{marginBottom: 16}}/>
                    <ReactECharts option={item.genChart && JSON.parse(item.genChart)}/>
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
              {/*  添加一个查看原始数据的按钮*/}
              <div className="margin-16"/>
              <Button type="primary" icon={<EyeOutlined/>} onClick={() => {
                // 触法对话框 传入数据 发送请求 获取数据 并且显示
                //  得到当前选中的图表的id
                getChartOriginData(item.id ?? 0);
                setVisible(true);

              }}>查看原始数据</Button>

            </Card>


          </List.Item>

          //  定义一个对话框

        )}
      />
      <Modal
        title="原始数据"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/*显示查询到的数据*/}
        <pre>{rawData}</pre>

      </Modal>
    </div>
  );
};
export default ChartList;
