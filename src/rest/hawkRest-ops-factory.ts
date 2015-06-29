/// Copyright 2014-2015 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///   http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.

/**
 * @ngdoc provider
 * @name hawkular.rest.HawkularOps
 * @description
 * # HawkularOps
 * Provider in the hawkular.rest.
 */

module hawkularRest {

  _module.provider('HawkularOps', function() {

    this.setHost = function(host) {
      this.host = host;
      return this;
    };

    this.setPort = function(port) {
      this.port = port;
      return this;
    };

    this.$get = ['$resource', '$location', '$http', function($resource, $location) {
      // If available, used pre-configured values, otherwise use values from current browser location of fallback to
      // defaults
      this.setHost(this.host || $location.host() || 'localhost');
      this.setPort(this.port || $location.port() || 8080);

      var prefix = 'http://' + this.host + ':' + this.port;
      var opsUrlPart = '/hawkular/opsq';
      var url = prefix + opsUrlPart;
      var factory: any = {};

      factory.Tenant = $resource(url + '/tenants', {});


      factory.OpsQ = function(tenantId){
        return $resource(url , null, {
          save: {
            method:'POST',
            headers: {'Hawkular-Tenant': tenantId}
          }
        });
      };


      return factory;
    }];

  });
}
