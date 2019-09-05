/**
 * @author: mazhaojun
 * @version: 2019-09-05
 * @description:
 *  This is a typical example for configuration.
 *  Please Do Not Change this file ever and never. If you want customize your configuration, you can touch another .js file and module.exports as follows.
 *  Because this file is in Git Repository but other files in current diretory is not.
 */

module.exports = {
  // the port which local sever will occupy
  port: 5003,
  // static-server mounted
  staticspath: '/var/www/html', // if you are on windows platform, please use path url like this 'd:\\gitlab\\test.test.com\\public'
  // enumeration type; 1 - with tools and static-server; 2 - only static-server
  mode: '2',
  // which type of http request need be proxied
  proxypath: '//api',
  // be proxied server
  proxytarget: 'http://test.t.test.com',
};
