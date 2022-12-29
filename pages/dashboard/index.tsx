import { useState, createElement } from "react";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu, Space, theme } from "antd";
import styles from "./dashboard.module.css";
import Link from "next/link";

// const { Header, Sider, Content } = Layout;

export default function Dashboard({ session }: { session: Session }) {
  const supabase = useSupabaseClient();

  const [collapsed, setCollapsed] = useState(false);
  //   const {
  //     token: { colorBgContainer },
  //   } = theme.useToken();

  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/amazon/authorize">Set up Amazon</Link>
    </div>

    // <Layout style={{ height: "100vh" }}>
    //   <Sider
    //     trigger={null}
    //     collapsible
    //     collapsed={collapsed}
    //     breakpoint="sm"
    //     collapsedWidth="0"
    //     onCollapse={(collapsed) => setCollapsed(collapsed)}
    //   >
    //     <div className={styles.logo}></div>
    //     <Menu
    //       theme="dark"
    //       mode="inline"
    //       defaultSelectedKeys={["1"]}
    //       items={[
    //         {
    //           key: "1",
    //           icon: <UserOutlined />,
    //           label: "nav 1",
    //         },
    //         {
    //           key: "2",
    //           icon: <VideoCameraOutlined />,
    //           label: "nav 2",
    //         },
    //         {
    //           key: "3",
    //           icon: <UploadOutlined />,
    //           label: "nav 3",
    //         },
    //       ]}
    //     />
    //   </Sider>
    //   <Layout>
    //     <Header style={{ padding: 0, background: colorBgContainer }}>
    //       {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
    //         className: styles.trigger,
    //         onClick: () => setCollapsed(!collapsed),
    //       })}
    //     </Header>
    //     <Content
    //       style={{
    //         color: "black",
    //       }}
    //     >
    //       <Space>
    //         <button
    //           className="button block"
    //           onClick={() => supabase.auth.signOut()}
    //         >
    //           Sign Out
    //         </button>
    //       </Space>
    //     </Content>
    //   </Layout>
    // </Layout>
  );
}
