import {genChartByAiAsyncUsingMQPOST} from '@/services/fyzbi/chartController';
import {UploadOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Divider, Form, Input, List, message, Select, Space, Upload} from 'antd';
import {useForm} from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import React, {useState} from 'react';

/**
 * 添加图表（异步）页面
 * @constructor
 *
 */
const Introduction: React.FC = () => {
  const backend_data = [
    {
      description: '1. 后端自定义Prompt预设模板并封装用户输入的数据和分析诉求,通过对接 AIGC 接口生成可视化图表 json 配置和分析结论,返回给前端渲染。',
    },
    {
      description: '2. 由于 AIGC 的输入字数有限制,使用 Easy Excel 解析用户上传的 XLSX 表格数据文件并压缩为 CSV,实测提高了 20% 的单次输入数据量、并节约了成本',
    },
    {
      description: '3. 为保证系统的安全性,对用户上传的原始数据文件进行了后缀名、大小、内容等多重校验',
    },
    {
      description: '4. 为防止某用户恶意占用系统资源,基于 Redisson 的 RateLimiter 实现分布式限流,控制单用户访问的频率',
    },
    {
      description: '5. 考虑到单个图表的原始数据量较大, 采用 MongoDB实现了对每份原始数据的分表存储,提高查询性能 20％',
    },
    {
      description: '6. 由于 AIGC 的响应时间较长,基于自定义 I0 密集型线程池 + 任务 队列实现了 AIGC 的并发执行和异步化,提交任务后即可响应前端,提高用户体验。',
    },
    {
      description: '7. 由于本地任务队列重启丢失数据,使用 RabbitMQ（分布式消息队列）来接受并持久化任务消息,通过 Direct 交换机转发给解耦的Al 生成模块消费并处理任务,提高了系统的可靠性',
    },


  ];

  const frontend_data = [
    {
      description: '1. 基于 Ant Design Pro 脚手架快速搭建初始项目，并根据业务定制项目模板，如封装全局异常处理逻辑。',
    },
    {
      description: '2. 使用 TypeScript + ESLint + Prettier + Husky 保证项目编码和提交规范，提高项目质量。',
    },
    {
      description: '3. 使用 Umi OpenAPI 插件，根据后端 Swagger 接口文档自动生成请求 service 层代码，大幅提高开发效率。',
    },
    {
      description: '4. 选用兼容性较好的 Echarts库，接收后端 Al 生成的动态 json 自动渲染可视化图表',
    },

  ];

  return (
    <div className="introduction">
      <Card title="项目介绍">

        <Card
          style={{marginTop: 16}}
          type="inner"
          title="项目描述"
          extra={<a href="#">More</a>}
        >
          基于 Spring Boot + MQ + AIGC(+ React) 的智能数据分析平台。区别于传统 Bl,用户只需要导入原始数据集、并输入分析诉求,就能自动生成可视化图表及分析结论,实现数据分析的降本增效。
        </Card>
        <Divider/> {/*分割线*/}

        <Card type="inner" title="后端" extra={<a href="#">More</a>}>
          <List
            itemLayout="horizontal"
            dataSource={backend_data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
        <Divider/> {/*分割线*/}
        <Card
          style={{marginTop: 16}}
          type="inner"
          title="前端"
          extra={<a href="#">More</a>}
        >
          <List
            itemLayout="horizontal"
            dataSource={frontend_data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>

      </Card>
    </div>
  );
};
export default Introduction;
