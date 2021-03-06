/*
 * main-page.js
 *
 * Simple page with two buttons. User clicks on a button to see the vacancy of
 * parking areas in Palo Alto / Newcastle. Queries are run through the VIMOC
 * API, sent through a Node server hosted on Modulus. Results are returned on
 * data-page.
 *
 * Author: Antony Bello
 * Date: 	June 3, 2015
 */

var frameModule = require("ui/frame");
var applicationModule = require("application");
var uidialogs = require("ui/dialogs");
var view = require("ui/core/view");
var http = require("http");
var platformModule = require("platform");

var page;

exports.pageLoaded = function(args) {

  page = args.object;

  // Make sure we're on iOS before making iOS-specific changes
  if (page.ios) {

    // Tell the frame module that the navigation bar should always display
    frameModule.topmost().ios.navBarVisibility = "always";

    // Change the UIViewController's title property
    page.ios.title = "Spotter";

    // Get access to the native iOS UINavigationController
    var controller = frameModule.topmost().ios.controller;

    // Call the UINavigationController's setNavigationBarHidden method
    controller.navigationBarHidden = false;
  }
};

exports.nearme = function(args) {

  var button = (args.object);

  if (button.android) {
    console.log("Application run on Android");
    (applicationModule.android.currentContext).startActivityForResult(new android.content.Intent(android.provider.Settings.ACTION_LOCATION_SOURCE_SETTINGS), 0);
  } else if (button.ios) {
    console.log("Application run on iOS");
    if (platformModule.device.osVersion.indexOf("8") === 0) {
      console.log("iOS version is greater or equal to 8.0");
      var iosLocationManager = CLLocationManager.alloc().init();
      iosLocationManager.requestWhenInUseAuthorization();
    }
  }

  frameModule.topmost().navigate({
    moduleName: "locations",
    animated: false,
    context: 'nearme'
  });
}

exports.geocode = function(args) {
  var textFieldInput = view.getViewById(page, "task").text;
  var parsedAddress = parseAddress(textFieldInput);
  var requestFormat = makeAddressString(parsedAddress);
  if (requestFormat != null) {
    frameModule.topmost().navigate({
      moduleName: "locations",
      animated: false,
      context: requestFormat
    });
  }
}


/* HELPER FUNCTIONS */

function validAddress(address) {
  if (firstEntryIsNumber(address) == -1) {
    return (address.length >= 3); // Street Name was entered
  } else {
    return (address.length >= 4); // Full Address
  }
}

function firstEntryIsNumber(address) {
  return parseInt(address[0]) || -1;
}

function makeAddressString(address) {
  var str = "";
  if (validAddress(address)) {
    for (var i = 0; i < address.length; i++) {
      if (i != address.length - 1) {
        str += (address[i] + "+");
      } else {
        str += address[i];
      }
    }
  } else {
    uidialogs.alert("Valid Address format: 169 University Avenue, Palo Alto | Ramona Street, Palo Alto");
    return null;
  }
  return str;
}

function parseAddress(address) {
  address = address.toLowerCase().trim();
  address = address.split(/[\s,]+/);
  return address;
}

// Font setter
exports.textfieldLoaded = function(args) {
  var element = args.object;
  element.ios.font = UIFont.fontWithNameSize("HelveticaNeue-Thin", 15);
}

exports.goButtonLoaded = function(args) {
  var element = args.object;
  element.ios.font = UIFont.fontWithNameSize("HelveticaNeue-Medium", 18);
}

exports.elementLoaded = function(args) {
  var element = args.object;
  element.ios.font = UIFont.fontWithNameSize("HelveticaNeue", 18);
}
