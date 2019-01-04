var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var workItems = [
  { id: "rkX1fdSH", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Loose hydraulic fitting', status: 'Completed', startTimestamp: '2015-10-22T14:00:00Z', address: '1795 Davie St, Vancouver, BC V6G 2M9', location: [49.287227, -123.141489], summary: 'A loose hydraulic fitting is allowing fluid leak out.'},
  { id: "rJeXyfdrH", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Pump temperature fault', status: 'Completed', startTimestamp: '2015-10-22T20:00:00Z', address: '1641 Davie St, Vancouver, BC V6G 1W1', location: [49.285547, -123.138915], summary: 'Pump 12-2242 is showing an excess in temperature.'},
  { id: "ByzQyz_BS", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Blowdown in progress', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '1095 W Pender St, Vancouver, BC V6E', location: [49.287339, -123.120203], summary: 'Condensate and gas have accumulated and need to be addressed immediately'},
  { id: "ByzQyz_BS", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Waste water pond collapse', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '1088 Burrard St, Vancouver, BC V6Z 2R9', location: [49.280396, -123.125868], summary: 'Waste water pond has collapsed.'},
  { id: "SyVXyMuSr", workflowId: 'B1r71fOBr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Solid Waste Contamination', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '977 Mainland St #987, Vancouver, BC V6B 1T2', location: [49.277026, -123.118487], summary: 'Detected contanimation of solid waste. Need to verify that there are no leaks. Containment policies in place'},
  { id: "B1r71fOBr", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Thermal radiation detected', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '157 st, 163 Keefer St, Vancouver, BC V6A 1X4', location: [49.279490, -123.099947], summary: 'EMERGENCY - HAZMAT. Radiation has been detected.'},
  { id: "HJ8QkzOSH", workflowId: 'SyVXyMuSr', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Waste water leakage', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '2795 East Hastings St, Vancouver, BC V5K 1Z8', location: [49.281159, -123.047076], summary: 'There is a leak in the waste water area that needs to be repaired'},
  { id: "BJwQJfdrH", workflowId: 'HJ8QkzOSH', assignee: 'rkX1fdSH', type: 'Job Order', title: 'Exhaust contamination', status: 'Completed', startTimestamp: '2015-10-22T07:00:00Z', address: '2930 Virtual Way, Vancouver, BC V5M 0A5', location: [49.259429, -123.044158], summary: 'Excessive venting detected and requires repair and containment'},
  { id: "HJQTjsUr", workflowId: 'SyVXyMuSr', assignee: 'BJQm1G_BS', type: 'Job Order', title: 'Excess Noise', status: 'ToDo', startTimestamp: '2015-10-22T15:00:00Z', address: '1780 E Broadway, Vancouver, BC V5N 1W3', location: [49.261782, -123.068705], summary: 'Pumps are producing noise in excess of maximum 100db'},
  { id: "Syx76jiUH", workflowId: 'SyVXyMuSr', assignee: 'BJQm1G_BS', type: 'Job Order', title: 'Pump vibration', status: 'ToDo', startTimestamp: '2015-10-22T07:00:00Z', address: '311 E Broadway, Vancouver, BC V5T 1W5', location: [49.262902, -123.098917], summary: 'Excess vibration detected at pumps'},
  { id: "HJbXpioIS", workflowId: 'SyVXyMuSr', assignee: 'BJQm1G_BS', type: 'Job Order', title: 'Hydrogen Sulfate  (H2S)leak', status: 'ToDo', startTimestamp: '2015-10-22T07:00:00Z', address: '2035 Yukon St, Vancouver, BC V5Y 3W3', location: [49.267271, -123.112822], summary: 'Hydrogen Sulfate (H2S) detected'},
  { id: "ryMXaos8S", workflowId: 'SyVXyMuSr', assignee: 'SyVXyMuSr', type: 'Job Order', title: 'Pump temperature fault', status: 'ToDo', startTimestamp: '2015-10-22T14:00:00Z', address: '555 W 12th Ave, Vancouver, BC V5Z 3X7', location: [49.260662, -123.116599], summary: 'Pump 15-6334 is showing an excess in temperature.'},
  { id: "SJEXaso8r", workflowId: 'SyVXyMuSr', assignee: 'B1r71fOBr', type: 'Job Order', title: 'Loose hydraulic fitting', status: 'ToDo', startTimestamp: '2015-10-22T07:00:00Z', address: '1502 E Hastings St, Vancouver, BC V5L 1S5', location: [49.281159, -123.073855], summary: 'A loose hydraulic fitting is allowing fluid leak out.'},
  { id: "H1H76ij8r", workflowId: 'HJ8QkzOSH', assignee: 'HJ8QkzOSH', type: 'Job Order', title: 'Waste water pond collapse', status: 'ToDo', startTimestamp: '2015-10-22T20:00:00Z', address: '860 Drake St, Vancouver, BC V6Z 2P2', location: [49.276903, -123.129645], summary: 'Waste water pond has collapsed.'},
  { id: "BkuXajsIB", workflowId: 'SyVXyMuSr', assignee: null, type: 'Job Order', title: 'Blowdown in progress', status: 'ToDo', startTimestamp: '2015-10-22T07:00:00Z', address: '3820 Oak St, Vancouver, BC V6H 2M5', location: [49.251362, -123.127070], summary: 'Condensate and gas have accumulated and need to be addressed immediately'}
];

function workordersRoute() {
  var workorders = new express.Router();
  workorders.use(cors());
  workorders.use(bodyParser());


  // GET REST endpoint - query params may or may not be populated
  workorders.get('/', function(req, res) {
    console.log(new Date(), 'In workorders route GET / req.query=', req.query);

    res.json(workItems);
  });

  return workorders;
}

module.exports = workordersRoute;
