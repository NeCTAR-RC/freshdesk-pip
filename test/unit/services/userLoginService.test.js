"use strict";

var expect = require("expect");
var userLoginService = require("../../../api/services/userLoginService");

describe("UserLoginService", function() {

  describe("validUser()", function() {
    it("Should provide a correct redirection URL", function() {
      expect(userLoginService).toExist('userLoginService not found');
      var payload = {
        "https://aaf.edu.au/attributes": {
         mail: "test@mailtest.yyy",
         cn: "testCN"
        }
      };
      var redirUrl = null;
      var res = {
        redirect: function(url) {
          redirUrl = url;
        }
      };
      userLoginService.validUser(payload, {}, res);
      expect(redirUrl.indexOf(sails.config.auth.freshdesk.url)).toEqual(0, 'Incorrect Redirection URL');
    });
  });

  describe("inValidUser()", function() {
    it("Should provide a JSON error message", function() {
      expect(userLoginService).toExist('userLoginService not found');
      var reason = "Invalid user";
      var json = null;
      var res = {
        json: function(jsonRes) {
          json = jsonRes;
        }
      };
      userLoginService.invalidUser(reason, {}, res);
      console.log(json);
      expect(json.failureReason).toEqual(reason, 'Incorrect JSON return');
    });
  });
});