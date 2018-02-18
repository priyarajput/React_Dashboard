import React from 'react';

import {Col, FormControl, Grid, LoremIpsum, Row, Sidebar, SidebarNav, SidebarNavItem} from '@sketchpixy/rubix';

import {withRouter} from 'react-router';

import roleMenuMapping from './roleMenuMapping';

@withRouter
class ApplicationSidebar extends React.Component {
  handleChange(e) {
    this._nav.search(e.target.value);
  }

  hideSideBar=(user,label)=>{
    if(!user) return true;
    let userRoles=user.propertyRoleMap[Object.keys(user.propertyRoleMap)[0]];
    if(userRoles){
      let hideSideBar= roleMenuMapping.roleMenuMapping.filter(mapping => mapping.label===label).map(mapping=>{
        return !(userRoles.indexOf(mapping.allowedRole)>-1)
      });
      return hideSideBar.length>0?!hideSideBar.some(flag=>!flag):true;
    }
    return true
  };

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <FormControl type='text' placeholder='Search...' onChange={::this.handleChange} className='sidebar-search' style={{border: 'none', background: 'none', margin: '10px 0 0 0', borderBottom: '1px solid #666', color: 'white'}} />
              <div className='sidebar-nav-container'>
                <SidebarNav style={{marginBottom: 0}} ref={(c) => this._nav = c}>

                  <div className='sidebar-header'>PAGES</div>

                  <SidebarNavItem hidden={this.hideSideBar(this.props.user,'Dashboard')} glyph='icon-fontello-gauge' name='Dashboard' href='/dashboard' />
                  <SidebarNavItem  hidden={this.hideSideBar(this.props.user,'Site Overview')} glyph='icon-fontello-easel' name='Site Overview' href='/overviewAnalytics' />
                  <SidebarNavItem glyph='icon-fontello-share' hidden={this.hideSideBar(this.props.user,'Referral Analytics')} name='Referral Analytics'>
                    <SidebarNav hidden={this.hideSideBar(this.props.user,'Referral Analytics')}>
                      <SidebarNavItem glyph='icon-fontello-shareable' name='Referral View' href='/audience/referralAnalytics' />
                      <SidebarNavItem glyph='icon-fontello-sitemap' name='Site Navigation View' href='/audience/referralAnalyticsSankey' />
                    </SidebarNav>
                  </SidebarNavItem>
                  <SidebarNavItem glyph='icon-fontello-cogs' hidden={this.hideSideBar(this.props.user,'CMS')} name='CMS'>
                    <SidebarNav hidden={this.hideSideBar(this.props.user,'CMS')}>
                      <SidebarNavItem glyph='icon-fontello-user-male' name='Author' href='/cmsAnalytics/authors' />
                      <SidebarNavItem glyph='icon-fontello-layers' name='Content Type' href='/cmsAnalytics/content' />
                      <SidebarNavItem glyph='icon-fontello-tasks' name='Category' href='/cmsAnalytics/categories' />
                    </SidebarNav>
                  </SidebarNavItem>
                  
                  <SidebarNavItem glyph='icon-fontello-bell' hidden={this.hideSideBar(this.props.user,'Push Notifications')} name='Push Notifications'>
                    <SidebarNav hidden={this.hideSideBar(this.props.user,'Push Notifications')}>
                      <SidebarNavItem hidden={this.hideSideBar(this.props.user,'Push Notification Send')} glyph='icon-fontello-rocket' name='Push Notification Send' href='/piStats/pushNotifications/send' />
                      <SidebarNavItem hidden={this.hideSideBar(this.props.user,'Push Notification List')} glyph='icon-fontello-list' name='Push Notification List' href='/piStats/pushNotifications/list' />
                      <SidebarNavItem glyph='icon-fontello-chart' hidden={this.hideSideBar(this.props.user,'Push Performance')} name='Push Performance' href='/pushnotificationperformance' />
                    </SidebarNav>
                  </SidebarNavItem>

                  <SidebarNavItem glyph='icon-fontello-users' hidden={this.hideSideBar(this.props.user,'Audience')} name='Audience'>
                    <SidebarNav hidden={this.hideSideBar(this.props.user,'Audience')}>
                      <SidebarNavItem glyph='icon-fontello-code' hidden={this.hideSideBar(this.props.user,'Technology')} name='Technology' href='/audience/Technology' />
                      <SidebarNavItem glyph='icon-fontello-gauge' hidden={this.hideSideBar(this.props.user,'Geography Analytics')} name='Geography Analytics' href='/audience/geographyAnalytics' />
                    </SidebarNav>
                  </SidebarNavItem>

                  <SidebarNavItem glyph='icon-fontello-users' hidden={this.hideSideBar(this.props.user,'User Management')} name='User Management'>
                    <SidebarNav hidden={this.hideSideBar(this.props.user,'User Management')}>                      
                        <SidebarNavItem glyph='icon-fontello-calendar' name='User Management' href='/userManagement' />
                  </SidebarNav>
                  </SidebarNavItem>
                  
                  
                      
                 </SidebarNav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

@withRouter
export default class SidebarContainer extends React.Component {
  render() {
    return (
      <div id='sidebar'>
        <div id='avatar'>
          <Grid>
            <Row className='fg-white'>
              <Col xs={4} collapseRight>
                  <img src='/imgs/app/avatars/avatar17.png' width='40' height='40'/>
              </Col>
              <Col xs={8} collapseLeft id='avatar-col'>
                  <div className='avatarImageAndText'>{this.props.user?this.props.user.name:'--'}</div>
              </Col>
            </Row>
          </Grid>
        </div>
        <div id='sidebar-container'>
          <Sidebar sidebar={0}>
            <ApplicationSidebar user={this.props.user}/>
          </Sidebar>
        </div>
      </div>
    );
  }
}
