/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _StudyTracker = __webpack_require__(25);

	var _StudyTracker2 = _interopRequireDefault(_StudyTracker);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.onload = function () {
	  ReactDOM.render(React.createElement(_StudyTracker2.default, null), document.getElementById("page"));
	}; /**
	    * Created by dblader on 10/04/18.
	    */

/***/ },

/***/ 25:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MS_TO_DAYS = 1 / (1000 * 60 * 60 * 24);
	var SIDEBAR_WIDTH = "24%";
	var COMPRESS_TBL_WIDTH = "75%";
	var HIGHLIGHT_COLOR = "#E9EBF3";
	var GET_DATA_URL = loris.BaseURL + "/study_tracker/ajax/getData.php";

	var backToFrontVLs = new Map();
	var frontToBackVLs = new Map();

	var SiteFilter = function (_React$Component) {
	    _inherits(SiteFilter, _React$Component);

	    function SiteFilter(props) {
	        _classCallCheck(this, SiteFilter);

	        return _possibleConstructorReturn(this, (SiteFilter.__proto__ || Object.getPrototypeOf(SiteFilter)).call(this, props));
	    }

	    _createClass(SiteFilter, [{
	        key: "render",
	        value: function render() {
	            var options = [];

	            if (this.props.sites.size > 1) {
	                options.push(React.createElement(
	                    "option",
	                    { key: "all", value: "all" },
	                    "Show All Sites"
	                ));
	            }
	            options = this.props.sites.map(function (name, alias) {
	                return React.createElement(
	                    "option",
	                    { key: alias, value: alias },
	                    name
	                );
	            });
	            return React.createElement(
	                "select",
	                { className: "form-control input-sm", onChange: this.props.filterSites },
	                options
	            );
	        }
	    }]);

	    return SiteFilter;
	}(React.Component);

	var CandidateFilter = function (_React$Component2) {
	    _inherits(CandidateFilter, _React$Component2);

	    function CandidateFilter(props) {
	        _classCallCheck(this, CandidateFilter);

	        var _this2 = _possibleConstructorReturn(this, (CandidateFilter.__proto__ || Object.getPrototypeOf(CandidateFilter)).call(this, props));

	        _this2.handleTextInputChange = _this2.handleTextInputChange.bind(_this2);
	        return _this2;
	    }

	    _createClass(CandidateFilter, [{
	        key: "handleTextInputChange",
	        value: function handleTextInputChange(e) {
	            this.props.filterCand(e.target.value);
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            return React.createElement("input", { className: "form-control input-sm",
	                type: "text",
	                name: "filterCand",
	                value: this.props.filterCandText,
	                onChange: this.handleTextInputChange,
	                placeholder: "Search by PSCID"
	            });
	        }
	    }]);

	    return CandidateFilter;
	}(React.Component);

	var CohortFilter = function (_React$Component3) {
	    _inherits(CohortFilter, _React$Component3);

	    function CohortFilter(props) {
	        _classCallCheck(this, CohortFilter);

	        return _possibleConstructorReturn(this, (CohortFilter.__proto__ || Object.getPrototypeOf(CohortFilter)).call(this, props));
	    }

	    _createClass(CohortFilter, [{
	        key: "render",
	        value: function render() {
	            var options = this.props.cohorts.map(function (cohort) {
	                return React.createElement(
	                    "option",
	                    { key: cohort, value: cohort },
	                    cohort
	                );
	            });
	            return React.createElement(
	                "select",
	                { className: "form-control input-sm", onChange: this.props.filterCohorts },
	                React.createElement(
	                    "option",
	                    { value: "all" },
	                    "Show All Cohorts"
	                ),
	                options
	            );
	        }
	    }]);

	    return CohortFilter;
	}(React.Component);

	var FilterDisplayToggle = function (_React$Component4) {
	    _inherits(FilterDisplayToggle, _React$Component4);

	    function FilterDisplayToggle() {
	        _classCallCheck(this, FilterDisplayToggle);

	        return _possibleConstructorReturn(this, (FilterDisplayToggle.__proto__ || Object.getPrototypeOf(FilterDisplayToggle)).apply(this, arguments));
	    }

	    _createClass(FilterDisplayToggle, [{
	        key: "render",
	        value: function render() {
	            var glyphClass = 'down';
	            if (this.props.filtersOpen) {
	                glyphClass = 'up';
	            }
	            return React.createElement(
	                "h5",
	                { className: "right-align",
	                    onClick: this.props.showFilters
	                },
	                "Filters \xA0",
	                React.createElement("span", { className: "glyphicon glyphicon-chevron-" + glyphClass })
	            );
	        }
	    }]);

	    return FilterDisplayToggle;
	}(React.Component);

	var Filters = function (_React$Component5) {
	    _inherits(Filters, _React$Component5);

	    function Filters() {
	        _classCallCheck(this, Filters);

	        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).apply(this, arguments));
	    }

	    _createClass(Filters, [{
	        key: "render",

	        // pass sites, teams, and cohort data once available
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "Filters col-md-6" },
	                React.createElement(
	                    "div",
	                    { className: "col-md-3" },
	                    React.createElement(CandidateFilter, {
	                        filterCand: this.props.filterCand
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-md-3" },
	                    React.createElement(SiteFilter, {
	                        sites: this.props.sites,
	                        filterSites: this.props.filterSites
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-md-3" },
	                    React.createElement(TeamFilter, {
	                        teams: this.props.teams,
	                        filterTeams: this.props.filterTeams
	                    })
	                ),
	                React.createElement(
	                    "div",
	                    { className: "col-md-3" },
	                    React.createElement(CohortFilter, {
	                        cohorts: this.props.cohorts,
	                        filterCohorts: this.props.filterCohorts
	                    })
	                )
	            );
	        }
	    }]);

	    return Filters;
	}(React.Component);

	var Legend = function (_React$Component6) {
	    _inherits(Legend, _React$Component6);

	    function Legend() {
	        _classCallCheck(this, Legend);

	        return _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).apply(this, arguments));
	    }

	    _createClass(Legend, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "div",
	                    { className: "SideBarHeader" },
	                    React.createElement(
	                        "h5",
	                        null,
	                        "Legend"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle no-deadline-visit" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "No deadline for visit. This is the initial state when a candidate is created."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle deadline-approaching-visit" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Visit registration deadline approaching. Once the Initial Assessment - Screening visit has been registered all other visits must be registered within 90 days."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle deadline-past-visit" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Deadline for visit registration has passed."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle complete-visit deadline-approaching-data-entry" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Visit registration has been completed. Data entry deadline is now approaching and should be completed within 14 days of visit registration."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle complete-visit deadline-past-data-entry" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Deadline for data entry has passed."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement("div", { className: "circle complete-visit complete-data-entry" }),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Initial data entry has been completed."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement(
	                        "div",
	                        { className: "circle complete-visit complete-data-entry" },
	                        React.createElement(
	                            "span",
	                            { className: "inner-circle-text" },
	                            "D"
	                        )
	                    ),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Double data entry has been completed."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement(
	                        "div",
	                        { className: "circle complete-visit complete-data-entry-dcc" },
	                        React.createElement("span", { className: "glyphicon glyphicon-ok inner-circle-glyph" })
	                    ),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Data has been sent to DCC."
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "legend-entry" },
	                    React.createElement(
	                        "div",
	                        { className: "circle cancelled-visit cancelled-data" },
	                        React.createElement("span", { className: "glyphicon glyphicon-remove inner-circle-glyph" })
	                    ),
	                    React.createElement(
	                        "span",
	                        null,
	                        "Visit has been cancelled. Participant has been either excluded or withdrawn."
	                    )
	                )
	            );
	        }
	    }]);

	    return Legend;
	}(React.Component);

	var SideBarCandInstContent = function (_React$Component7) {
	    _inherits(SideBarCandInstContent, _React$Component7);

	    function SideBarCandInstContent() {
	        _classCallCheck(this, SideBarCandInstContent);

	        return _possibleConstructorReturn(this, (SideBarCandInstContent.__proto__ || Object.getPrototypeOf(SideBarCandInstContent)).apply(this, arguments));
	    }

	    _createClass(SideBarCandInstContent, [{
	        key: "render",
	        value: function render() {
	            var content = [];

	            var bold = { fontWeight: "bold" };

	            var instListURL = loris.BaseURL + "/instrument_list/?candID=" + this.props.candid + "&sessionID=" + this.props.sessionID;
	            content.push(React.createElement(
	                "div",
	                { className: "SideBarHeader" },
	                React.createElement(
	                    "h5",
	                    null,
	                    React.createElement(
	                        "a",
	                        { href: instListURL },
	                        "Participant ",
	                        this.props.pscid
	                    )
	                )
	            ));
	            var data = this.props.data;
	            var sessionID = this.props.sessionID;
	            var candid = this.props.candid;
	            var style = {
	                whiteSpace: "nowrap",
	                textOverflow: "ellipsis",
	                overflow: "hidden",
	                display: "block"
	            };
	            for (var sg in data) {
	                content.push(React.createElement(
	                    "h6",
	                    null,
	                    sg
	                ));
	                for (var t in data[sg]) {
	                    var inst = data[sg][t];
	                    var url = loris.BaseURL + "/" + inst.testName + "/?commentID=" + inst.commentID + "&sessionID=" + sessionID + "&candID=" + candid;
	                    var flagCompletion = void 0;
	                    if (inst.ddeCompletion === "Complete") {
	                        flagCompletion = React.createElement(
	                            "span",
	                            null,
	                            React.createElement("span", { className: "glyphicon glyphicon-ok complete" }),
	                            React.createElement("span", { className: "glyphicon glyphicon-ok complete" })
	                        );
	                    } else if (inst.completion === "Complete") {
	                        flagCompletion = React.createElement("span", { className: "glyphicon glyphicon-ok complete" });
	                    } else {
	                        flagCompletion = React.createElement("span", { className: "glyphicon glyphicon-alert deadline-past" });
	                    }
	                    var conflicts = [];
	                    if (inst.conflicts) {
	                        conflicts.push(React.createElement(
	                            "a",
	                            { className: "left-indent2",
	                                href: "#",
	                                onClick: openConflictResolver.bind(null, candid, inst.testName)
	                            },
	                            React.createElement("span", { className: "glyphicon glyphicon-remove-circle" }),
	                            "Conflicts"
	                        ));
	                    }
	                    content.push(React.createElement(
	                        "div",
	                        { className: "SideBarInst" },
	                        React.createElement(
	                            "a",
	                            { href: url, style: style },
	                            flagCompletion,
	                            inst.fullName
	                        ),
	                        conflicts
	                    ));
	                }
	            }
	            return React.createElement(
	                "div",
	                null,
	                content
	            );
	        }
	    }]);

	    return SideBarCandInstContent;
	}(React.Component);

	var SideBarCandContent = function (_React$Component8) {
	    _inherits(SideBarCandContent, _React$Component8);

	    function SideBarCandContent() {
	        _classCallCheck(this, SideBarCandContent);

	        return _possibleConstructorReturn(this, (SideBarCandContent.__proto__ || Object.getPrototypeOf(SideBarCandContent)).apply(this, arguments));
	    }

	    _createClass(SideBarCandContent, [{
	        key: "render",
	        value: function render() {
	            var content = [];
	            // use local variables for less typing
	            var visits = this.props.row.visits;
	            var pscid = this.props.row.pscid;
	            var candid = this.props.row.candid;
	            var feedback = this.props.row.feedback;
	            var statusDesc = this.props.row.statusDesc;
	            var dateReg = formatDate(new Date(this.props.row.dateReg));
	            var iconColor = { color: "#444444" };
	            // determine if participant has profile level feedback and add appropriate
	            // links and display as such
	            var profileURL = loris.BaseURL + "/" + candid;
	            var feedbackIcon = [];
	            if (feedback.profile) {
	                feedbackIcon.push(React.createElement("span", {
	                    className: "glyphicon glyphicon-edit",
	                    style: iconColor
	                }));
	                content.push(React.createElement(
	                    "div",
	                    { className: "SideBarHeader" },
	                    React.createElement(
	                        "h5",
	                        null,
	                        feedbackIcon,
	                        "\xA0",
	                        React.createElement(
	                            "a",
	                            { href: "#", onClick: function onClick() {
	                                    return openBVLFeedback(candid);
	                                } },
	                            "Participant ",
	                            pscid
	                        )
	                    )
	                ));
	            } else {
	                content.push(React.createElement(
	                    "div",
	                    { className: "SideBarHeader" },
	                    React.createElement(
	                        "h5",
	                        null,
	                        React.createElement(
	                            "a",
	                            { href: profileURL },
	                            "Participant ",
	                            pscid
	                        )
	                    )
	                ));
	            }

	            if (this.props.row.dxReappraisal) {
	                var url = loris.BaseURL + ("/candidate_parameters/?candID=" + candid + "&identifier=" + candid + "#diagnosisReappraisal");
	                content.push(React.createElement(
	                    "a",
	                    {
	                        href: url,
	                        className: "small"
	                    },
	                    React.createElement("span", { className: "glyphicon glyphicon-random", style: iconColor }),
	                    React.createElement(
	                        "em",
	                        null,
	                        "\xA0Participant has had a diagnosis reappraisal"
	                    )
	                ));
	            }

	            content.push(React.createElement(
	                "p",
	                { className: "small" },
	                React.createElement(
	                    "em",
	                    null,
	                    "Status: ",
	                    statusDesc,
	                    ", registered on ",
	                    dateReg
	                )
	            ));

	            var visitContent = [];
	            visits.forEach(function (v) {
	                // make sure visit is part of current cohort
	                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
	                    var _url = loris.BaseURL + "/";
	                    var vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
	                    var de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
	                    var visitLink = [];
	                    var instrumentFeedback = [];

	                    // determine if participant has visit level feedback and display as such
	                    if (feedback.visits && feedback.visits.hasOwnProperty(v.sessionID)) {
	                        visitLink.push(React.createElement(
	                            "a",
	                            { href: "#",
	                                onClick: function onClick() {
	                                    return openBVLFeedback(candid, v.sessionID);
	                                }
	                            },
	                            React.createElement("span", { className: "glyphicon glyphicon-edit", style: iconColor }),
	                            "\xA0",
	                            backToFrontVLs.get(v.visitLabel)
	                        ));
	                    } else {
	                        _url += "instrument_list/?candID=" + candid + "&sessionID=" + v.sessionID;
	                        visitLink.push(React.createElement(
	                            "a",
	                            { href: _url },
	                            backToFrontVLs.get(v.visitLabel)
	                        ));
	                    }
	                    // Check if there is instrument feedback and whether this
	                    // particular visit
	                    if (feedback.instruments && feedback.instruments.hasOwnProperty(v.sessionID)) {
	                        var instLinkStyle = {
	                            whiteSpace: "nowrap",
	                            textOverflow: "ellipsis",
	                            overflow: "hidden",
	                            display: "block",
	                            margin: "5px"
	                        };

	                        var _loop = function _loop(f) {
	                            if (!feedback.instruments[f].commentID) {
	                                return "continue";
	                            }
	                            var fb = feedback.instruments[f];
	                            instrumentFeedback.push(React.createElement(
	                                "a",
	                                { href: "#",
	                                    className: "sidebar-visit-status",
	                                    onClick: function onClick() {
	                                        return openBVLFeedback(candid, v.sessionID, fb.commentID, fb.testName);
	                                    },
	                                    style: instLinkStyle
	                                },
	                                React.createElement("span", { className: "glyphicon glyphicon-edit", style: iconColor }),
	                                " " + fb.fullName
	                            ));
	                        };

	                        for (var f in feedback.instruments) {
	                            var _ret = _loop(f);

	                            if (_ret === "continue") continue;
	                        }
	                    }
	                    if (vr.status === "complete" && de.status === "complete") {
	                        visitContent.push(React.createElement(
	                            "div",
	                            { className: "sidebar-visit" },
	                            visitLink,
	                            vr.html,
	                            instrumentFeedback
	                        ));
	                    } else if (de.html) {
	                        visitContent.push(React.createElement(
	                            "div",
	                            { className: "sidebar-visit" },
	                            visitLink,
	                            React.createElement(
	                                "p",
	                                { className: "sidebar-visit-status" },
	                                "Visit Registration ",
	                                vr.html
	                            ),
	                            React.createElement(
	                                "p",
	                                { className: "sidebar-visit-status" },
	                                "Data Entry ",
	                                de.html
	                            ),
	                            instrumentFeedback
	                        ));
	                    } else {
	                        _url += candid;
	                        visitContent.push(React.createElement(
	                            "div",
	                            { className: "sidebar-visit" },
	                            React.createElement(
	                                "a",
	                                { href: _url },
	                                backToFrontVLs.get(v.visitLabel),
	                                ":"
	                            ),
	                            React.createElement(
	                                "p",
	                                { className: "sidebar-visit-status" },
	                                "Visit Registration: ",
	                                vr.html
	                            )
	                        ));
	                    }
	                }
	            }.bind(this));
	            if (visitContent.length === 0) {
	                visitContent = React.createElement(
	                    "p",
	                    null,
	                    "No applicable visits for this participant for cohort ",
	                    this.props.currentCohort
	                );
	            }
	            content.push(visitContent);
	            return React.createElement(
	                "div",
	                { className: "SideBarCandContent" },
	                content
	            );
	        }
	    }]);

	    return SideBarCandContent;
	}(React.Component);

	var SideBarVisitContent = function (_React$Component9) {
	    _inherits(SideBarVisitContent, _React$Component9);

	    function SideBarVisitContent() {
	        _classCallCheck(this, SideBarVisitContent);

	        return _possibleConstructorReturn(this, (SideBarVisitContent.__proto__ || Object.getPrototypeOf(SideBarVisitContent)).apply(this, arguments));
	    }

	    _createClass(SideBarVisitContent, [{
	        key: "render",
	        value: function render() {
	            var visitDeadlines = [];
	            var dataDeadlines = [];

	            var visitsSortable = [];
	            var dataSortable = [];
	            // Loop through rows
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.props.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var row = _step.value;

	                    if (row.psc !== this.props.currentSite && this.props.currentSite !== "all") {
	                        continue;
	                    }
	                    var pscid = row.pscid;
	                    var candid = row.candid;
	                    var instListUrl = loris.BaseURL + "/instrument_list/?candID=" + candid + "&sessionID=";
	                    var timepointListURL = loris.BaseURL + "/timepoint_list/?candID=" + candid;
	                    // Look for visit with corresponding visit label
	                    var _iteratorNormalCompletion4 = true;
	                    var _didIteratorError4 = false;
	                    var _iteratorError4 = undefined;

	                    try {
	                        for (var _iterator4 = row.visits[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                            var v = _step4.value;

	                            if (v.visitLabel === this.props.visit) {
	                                if (v.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
	                                    instListUrl += v.sessionID;
	                                    var vr = prettyStatus(v.visitRegStatus, v.visitRegDueDate);
	                                    if (vr.status === "deadline-past" || vr.status === "deadline-approaching") {
	                                        visitsSortable.push({
	                                            "prettyStatus": vr,
	                                            "URL": timepointListURL,
	                                            "pscid": pscid
	                                        });
	                                    }
	                                    var de = prettyStatus(v.dataEntryStatus, v.dataEntryDueDate);
	                                    if (de.status === "deadline-past" || de.status === "deadline-approaching") {
	                                        dataSortable.push({
	                                            "prettyStatus": de,
	                                            "URL": instListUrl,
	                                            "pscid": pscid
	                                        });
	                                    }
	                                }
	                                break;
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError4 = true;
	                        _iteratorError4 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                _iterator4.return();
	                            }
	                        } finally {
	                            if (_didIteratorError4) {
	                                throw _iteratorError4;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            visitsSortable = visitsSortable.sort(function (a, b) {
	                return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
	            });

	            dataSortable = dataSortable.sort(function (a, b) {
	                return a.prettyStatus.daysLeft - b.prettyStatus.daysLeft;
	            });

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = visitsSortable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var _vr = _step2.value;

	                    visitDeadlines.push(React.createElement(
	                        "p",
	                        null,
	                        React.createElement(
	                            "a",
	                            { href: _vr.URL },
	                            _vr.pscid
	                        ),
	                        _vr.prettyStatus.html
	                    ));
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = dataSortable[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _de = _step3.value;

	                    dataDeadlines.push(React.createElement(
	                        "p",
	                        null,
	                        React.createElement(
	                            "a",
	                            { href: _de.URL },
	                            _de.pscid
	                        ),
	                        _de.prettyStatus.html
	                    ));
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            if (visitDeadlines.length <= 1) {
	                visitDeadlines = visitDeadlines.concat(React.createElement(
	                    "p",
	                    { className: "complete" },
	                    "No upcoming visit deadlines"
	                ));
	            }
	            if (dataDeadlines.length <= 1) {
	                dataDeadlines = dataDeadlines.concat(React.createElement(
	                    "p",
	                    { className: "complete" },
	                    "No upcoming data entry deadlines"
	                ));
	            }

	            return React.createElement(
	                "div",
	                { className: "SideBarVisitContent" },
	                React.createElement(
	                    "div",
	                    { className: "SideBarHeader" },
	                    React.createElement(
	                        "h5",
	                        null,
	                        backToFrontVLs.get(this.props.visit),
	                        " Visit"
	                    )
	                ),
	                React.createElement(
	                    "div",
	                    { className: "SideBarSubContent" },
	                    React.createElement(
	                        "h5",
	                        { className: "SideBarSubheader" },
	                        "Upcoming Visit Deadlines"
	                    ),
	                    visitDeadlines
	                ),
	                React.createElement(
	                    "div",
	                    { className: "SideBarSubContent" },
	                    React.createElement(
	                        "h5",
	                        { className: "SideBarSubheader" },
	                        "Upcoming Data Entry Deadlines"
	                    ),
	                    dataDeadlines
	                )
	            );
	        }
	    }]);

	    return SideBarVisitContent;
	}(React.Component);

	var SideBar = function (_React$Component10) {
	    _inherits(SideBar, _React$Component10);

	    function SideBar() {
	        _classCallCheck(this, SideBar);

	        return _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).apply(this, arguments));
	    }

	    _createClass(SideBar, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { className: "SideBar" },
	                React.createElement(
	                    "div",
	                    { className: "SideBarContent" },
	                    React.createElement(
	                        "a",
	                        {
	                            href: "#",
	                            className: "closebtn",
	                            onClick: this.props.closeSideBar
	                        },
	                        "\xD7"
	                    ),
	                    this.props.sideBarContent
	                )
	            );
	        }
	    }]);

	    return SideBar;
	}(React.Component);

	var VisitCell = function (_React$Component11) {
	    _inherits(VisitCell, _React$Component11);

	    function VisitCell() {
	        _classCallCheck(this, VisitCell);

	        return _possibleConstructorReturn(this, (VisitCell.__proto__ || Object.getPrototypeOf(VisitCell)).apply(this, arguments));
	    }

	    _createClass(VisitCell, [{
	        key: "render",
	        value: function render() {
	            var _this12 = this;

	            var visit = this.props.visit;
	            var bgColor = {};

	            if (visit.visitLabel === this.props.currentVisit) {
	                bgColor = { backgroundColor: HIGHLIGHT_COLOR };
	            }
	            if (visit.cohort === this.props.currentCohort || this.props.currentCohort === "all") {
	                var _ret2 = function () {
	                    var tooltipContent = [];
	                    var vr = prettyStatus(visit.visitRegStatus, visit.visitRegDueDate);
	                    tooltipContent.push(React.createElement(
	                        "p",
	                        { key: "vr-status" },
	                        "Visit Registration: ",
	                        vr.html
	                    ));
	                    var innerCircleInfo = null;
	                    if (visit.dataEntryStatus) {
	                        var de = prettyStatus(visit.dataEntryStatus, visit.dataEntryDueDate);
	                        tooltipContent.push(React.createElement(
	                            "p",
	                            { key: "de-status" },
	                            "Data Entry: ",
	                            de.html
	                        ));
	                        if (visit.totalInstrs) {
	                            tooltipContent.push(React.createElement(
	                                "p",
	                                { key: "instr-entered", className: "center" },
	                                React.createElement(
	                                    "i",
	                                    null,
	                                    visit.instrCompleted,
	                                    "/",
	                                    visit.totalInstrs,
	                                    " instruments entered"
	                                )
	                            ));
	                        }
	                        if (visit.totalDDEInstrs) {
	                            tooltipContent.push(React.createElement(
	                                "p",
	                                { key: "dde" },
	                                "Double Data Entry:"
	                            ), React.createElement(
	                                "p",
	                                { key: "dde-entered", className: "center" },
	                                React.createElement(
	                                    "i",
	                                    null,
	                                    visit.ddeInstCompleted,
	                                    "/",
	                                    visit.totalDDEInstrs,
	                                    " instruments entered"
	                                )
	                            ));
	                        }

	                        if (visit.numConflicts > 0) {
	                            tooltipContent.push(React.createElement(
	                                "p",
	                                { key: "conflicts", className: "center" },
	                                React.createElement("span", { className: "glyphicon glyphicon-remove-circle" }),
	                                "\xA0",
	                                visit.numConflicts,
	                                " unresolved conflicts."
	                            ));
	                        }
	                        if (visit.visitRegStatus === "cancelled-visit") {
	                            innerCircleInfo = React.createElement("span", { className: "glyphicon glyphicon-remove inner-circle-glyph" });
	                        } else if (visit.sentToDCC) {
	                            innerCircleInfo = React.createElement("span", { className: "glyphicon glyphicon-ok inner-circle-glyph" });
	                            tooltipContent.push(React.createElement(
	                                "p",
	                                { key: "dcc-sent", className: "complete" },
	                                "Data sent to DCC"
	                            ));
	                        } else if (visit.ddeCompleted && visit.dataEntryStatus === 'complete-data-entry') {
	                            innerCircleInfo = React.createElement(
	                                "span",
	                                { className: "inner-circle-text" },
	                                "D"
	                            );
	                            tooltipContent.push(React.createElement(
	                                "p",
	                                { key: "dcc-not-sent", className: "deadline-approaching" },
	                                "Data not yet sent to DCC"
	                            ));
	                        }
	                    }

	                    var visitClass = "circle " + visit.dataEntryStatus + " " + visit.visitRegStatus;

	                    var sidebarArgs = {
	                        sessionID: visit.sessionID,
	                        pscid: _this12.props.pscid,
	                        candid: _this12.props.candid
	                    };

	                    return {
	                        v: React.createElement(
	                            "td",
	                            { className: visit.visitLabel, style: bgColor },
	                            React.createElement(
	                                "div",
	                                { onClick: function onClick() {
	                                        return _this12.props.showCandInstFocus(sidebarArgs);
	                                    },
	                                    "data-tip": true, "data-for": visit.sessionID,
	                                    className: visitClass
	                                },
	                                innerCircleInfo,
	                                React.createElement(
	                                    ReactTooltip,
	                                    { id: visit.sessionID, place: "top", type: "dark", effect: "solid" },
	                                    React.createElement(
	                                        "div",
	                                        { className: "ReactTooltipContent" },
	                                        tooltipContent
	                                    )
	                                )
	                            )
	                        )
	                    };
	                }();

	                if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
	            } else {
	                return React.createElement(
	                    "td",
	                    { className: "center " + visit.visitLabel, style: bgColor },
	                    "N/A"
	                );
	            }
	        }
	    }]);

	    return VisitCell;
	}(React.Component);

	var PSCIDCell = function (_React$Component12) {
	    _inherits(PSCIDCell, _React$Component12);

	    function PSCIDCell() {
	        _classCallCheck(this, PSCIDCell);

	        return _possibleConstructorReturn(this, (PSCIDCell.__proto__ || Object.getPrototypeOf(PSCIDCell)).apply(this, arguments));
	    }

	    _createClass(PSCIDCell, [{
	        key: "render",
	        value: function render() {
	            var feedBackIcons = [];
	            var style = { color: "#444444" };
	            if (Object.keys(this.props.feedback).length) {
	                feedBackIcons.push(React.createElement("span", { className: "glyphicon glyphicon-edit", style: style }), React.createElement(
	                    "span",
	                    null,
	                    "\xA0"
	                ));
	            }
	            if (this.props.dxReappraisal) {
	                feedBackIcons.push(React.createElement("span", { className: "glyphicon glyphicon-random", style: style }));
	            }
	            return React.createElement(
	                "td",
	                {
	                    className: "PSCIDCell",
	                    onClick: this.props.clickHandler },
	                this.props.pscid,
	                "\xA0",
	                feedBackIcons
	            );
	        }
	    }]);

	    return PSCIDCell;
	}(React.Component);

	var StudyTrackerRow = function (_React$Component13) {
	    _inherits(StudyTrackerRow, _React$Component13);

	    function StudyTrackerRow(props) {
	        _classCallCheck(this, StudyTrackerRow);

	        var _this14 = _possibleConstructorReturn(this, (StudyTrackerRow.__proto__ || Object.getPrototypeOf(StudyTrackerRow)).call(this, props));

	        _this14.highlightRow = _this14.highlightRow.bind(_this14);
	        _this14.unhighlightRow = _this14.unhighlightRow.bind(_this14);
	        _this14.keepHighlightedShowCandFocus = _this14.keepHighlightedShowCandFocus.bind(_this14);
	        return _this14;
	    }

	    _createClass(StudyTrackerRow, [{
	        key: "highlightRow",
	        value: function highlightRow() {
	            $("#" + this.props.pscid).css("background-color", HIGHLIGHT_COLOR);
	        }
	    }, {
	        key: "unhighlightRow",
	        value: function unhighlightRow() {
	            if (this.props.currentPSCID !== this.props.pscid) {
	                $("#" + this.props.pscid).css("background-color", "");
	            }
	        }
	    }, {
	        key: "keepHighlightedShowCandFocus",
	        value: function keepHighlightedShowCandFocus(event) {
	            // unset all other highlights
	            $(".StudyTrackerRow").css("background-color", "");
	            this.props.visits.forEach(function (v) {
	                $("." + v.visitLabel).css("background-color", "");
	            });
	            this.highlightRow();
	            // if click occurs on a circle with data-entry in the class
	            // then it is both a Visit Circle and has instrument related data
	            // to be displayed.
	            // otherwise, show
	            if (!~event.target.className.indexOf('data-entry')) {
	                this.props.showCandFocus(event);
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var style = {};
	            var visits = this.props.visits.map(function (v, index) {
	                return React.createElement(VisitCell, {
	                    key: index,
	                    visit: v,
	                    pscid: this.props.pscid,
	                    candid: this.props.candid,
	                    currentCohort: this.props.currentCohort,
	                    currentVisit: this.props.currentVisit,
	                    showCandInstFocus: this.props.showCandInstFocus
	                });
	            }.bind(this));
	            if (this.props.pscid === this.props.currentPSCID) {
	                style = { backgroundColor: HIGHLIGHT_COLOR };
	            }
	            return React.createElement(
	                "tr",
	                {
	                    className: "StudyTrackerRow",
	                    id: this.props.pscid,
	                    onClick: this.keepHighlightedShowCandFocus,
	                    onMouseEnter: this.highlightRow,
	                    onMouseLeave: this.unhighlightRow,
	                    style: style
	                },
	                React.createElement(PSCIDCell, {
	                    pscid: this.props.pscid,
	                    feedback: this.props.feedback,
	                    dxReappraisal: this.props.dxReappraisal,
	                    clickHandler: this.keepHighlightedShowCandFocus
	                }),
	                visits
	            );
	        }
	    }]);

	    return StudyTrackerRow;
	}(React.Component);

	var StudyTrackerHeader = function (_React$Component14) {
	    _inherits(StudyTrackerHeader, _React$Component14);

	    function StudyTrackerHeader(props) {
	        _classCallCheck(this, StudyTrackerHeader);

	        var _this15 = _possibleConstructorReturn(this, (StudyTrackerHeader.__proto__ || Object.getPrototypeOf(StudyTrackerHeader)).call(this, props));

	        _this15.state = {
	            visitInFocus: null
	        };
	        _this15.highlightColumns = _this15.highlightColumns.bind(_this15);
	        _this15.unhighlightColumns = _this15.unhighlightColumns.bind(_this15);
	        _this15.switchOrder = _this15.switchOrder.bind(_this15);
	        _this15.keepHighlightedShowVisitFocus = _this15.keepHighlightedShowVisitFocus.bind(_this15);
	        return _this15;
	    }

	    // When mouse enters header cell, highlight all cells for that visit
	    // This means that the text that shows up in the column header
	    // must be equal to the css class name which is perhaps bad design


	    _createClass(StudyTrackerHeader, [{
	        key: "highlightColumns",
	        value: function highlightColumns(event) {
	            var beVL = frontToBackVLs.get($(event.target).text());
	            var visitClass = "." + beVL;
	            $(visitClass).css("background-color", HIGHLIGHT_COLOR);
	        }
	    }, {
	        key: "unhighlightColumns",
	        value: function unhighlightColumns(event) {
	            var beVL = frontToBackVLs.get($(event.target).text());
	            if (this.props.currentVisit !== beVL) {
	                var visitClass = "." + beVL;
	                $(visitClass).css("background-color", "");
	            }
	        }
	    }, {
	        key: "keepHighlightedShowVisitFocus",
	        value: function keepHighlightedShowVisitFocus(event) {
	            // // first unset all other highlights
	            $(".StudyTrackerRow").css("background-color", "");
	            this.props.visitLabels.forEach(function (vl) {
	                $("." + vl).css("background-color", "");
	            });
	            // // then apply highlighting to only this column
	            this.highlightColumns(event);

	            this.props.showVisitFocus(event);
	        }
	    }, {
	        key: "switchOrder",
	        value: function switchOrder() {
	            if (document.getElementById("order-toggle").classList.contains("glyphicon-chevron-down")) {
	                document.getElementById("order-toggle").classList.remove("glyphicon-chevron-down");
	                document.getElementById("order-toggle").classList.add("glyphicon-chevron-up");
	            } else {
	                document.getElementById("order-toggle").classList.remove("glyphicon-chevron-up");
	                document.getElementById("order-toggle").classList.add("glyphicon-chevron-down");
	            }
	            this.props.switchOrder();
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var colWidth = 91.6666 / this.props.visitLabels.length;
	            var colStyle = { width: colWidth + '%' };
	            var visitLabelHeaders = this.props.visitLabels.map(function (vl) {
	                var cssClass = "VLHeader " + vl;
	                return React.createElement(
	                    "th",
	                    {
	                        style: colStyle,
	                        onMouseEnter: this.highlightColumns,
	                        onMouseLeave: this.unhighlightColumns,
	                        onClick: this.keepHighlightedShowVisitFocus,
	                        key: vl,
	                        className: cssClass },
	                    backToFrontVLs.get(vl)
	                );
	            }.bind(this));
	            return React.createElement(
	                "thead",
	                { className: "StudyTrackerHeader" },
	                React.createElement(
	                    "tr",
	                    null,
	                    React.createElement("th", { id: "order-toggle",
	                        className: "col-md-1 center glyphicon glyphicon-chevron-down",
	                        style: { color: "#444444" },
	                        onClick: this.switchOrder
	                    }),
	                    visitLabelHeaders
	                )
	            );
	        }
	    }]);

	    return StudyTrackerHeader;
	}(React.Component);

	var StudyTracker = function (_React$Component15) {
	    _inherits(StudyTracker, _React$Component15);

	    function StudyTracker(props) {
	        _classCallCheck(this, StudyTracker);

	        var _this16 = _possibleConstructorReturn(this, (StudyTracker.__proto__ || Object.getPrototypeOf(StudyTracker)).call(this, props));

	        _this16.state = {
	            rows: [],
	            visitLabels: [],
	            feVisitLabels: [],
	            currentSite: "all",
	            sites: new Map(),
	            teams: [],
	            currentTeam: "COMPASS-ND",
	            currentCohort: "all",
	            cohorts: [],
	            sideBarContent: null,
	            currentPSCID: null,
	            currentVisit: null,
	            currentSideBarFocus: null,
	            filterCandText: "",
	            filtersOpen: true,
	            active: _this16.props.active,
	            isLoading: true
	        };
	        _this16.showCandInstFocus = _this16.showCandInstFocus.bind(_this16);
	        _this16.showCandFocus = _this16.showCandFocus.bind(_this16);
	        _this16.showVisitFocus = _this16.showVisitFocus.bind(_this16);
	        _this16.showLegend = _this16.showLegend.bind(_this16);
	        _this16.showSideBar = _this16.showSideBar.bind(_this16);
	        _this16.closeSideBar = _this16.closeSideBar.bind(_this16);
	        _this16.showFilters = _this16.showFilters.bind(_this16);
	        _this16.filterCand = _this16.filterCand.bind(_this16);
	        _this16.filterSites = _this16.filterSites.bind(_this16);
	        _this16.filterTeams = _this16.filterTeams.bind(_this16);
	        _this16.filterCohorts = _this16.filterCohorts.bind(_this16);
	        _this16.switchOrder = _this16.switchOrder.bind(_this16);
	        _this16.renderRow = _this16.renderRow.bind(_this16);
	        _this16.rowHasCurrentCohortVisit = _this16.rowHasCurrentCohortVisit.bind(_this16);
	        return _this16;
	    }

	    _createClass(StudyTracker, [{
	        key: "loadDataFromServer",
	        value: function loadDataFromServer() {
	            $.get(GET_DATA_URL, { data: "all" }, function (data, status) {
	                if (status === "success") {
	                    var cohorts = [],
	                        visitLabels = [],
	                        feVisitLabels = [],
	                        rows = [];
	                    var sites = new Map();

	                    for (var r in data.tableData) {
	                        rows.push(data.tableData[r]);
	                    }
	                    this.setState({ rows: rows });

	                    for (var c in data.cohorts) {
	                        cohorts.push(data.cohorts[c]);
	                    }
	                    this.setState({ cohorts: cohorts });

	                    for (var s in data.sites) {
	                        sites.set(data.sites[s].Alias, data.sites[s].Name);
	                    }
	                    this.setState({ sites: sites });

	                    for (var i = 0; i < data.visitLabels.length; i++) {
	                        visitLabels.push(data.visitLabels[i]);
	                        feVisitLabels.push(data.feVisitLabels[i]);
	                        backToFrontVLs.set(data.visitLabels[i], data.feVisitLabels[i]);
	                        frontToBackVLs.set(data.feVisitLabels[i], data.visitLabels[i]);
	                    }
	                    this.setState({
	                        visitLabels: visitLabels,
	                        feVisitLabels: feVisitLabels,
	                        isLoading: false
	                    });
	                }
	            }.bind(this));
	        }
	    }, {
	        key: "componentDidMount",
	        value: function componentDidMount() {
	            this.loadDataFromServer();
	        }
	    }, {
	        key: "showCandInstFocus",
	        value: function showCandInstFocus(sidebarArgs) {
	            this.setState({
	                currentPSCID: sidebarArgs.pscid,
	                currentVisit: null,
	                currentSideBarFocus: "candidate_instruments"
	            });

	            if (sidebarArgs.sessionID > 0) {
	                $.get(GET_DATA_URL, { data: "instruments", "sessionID": sidebarArgs.sessionID }, function (data, status) {
	                    if (status === "success") {
	                        var sideBarContent = React.createElement(SideBarCandInstContent, {
	                            sessionID: sidebarArgs.sessionID,
	                            pscid: sidebarArgs.pscid,
	                            candid: sidebarArgs.candid,
	                            data: data
	                        });
	                        this.setState({
	                            sideBarContent: sideBarContent
	                        });
	                        this.showSideBar();
	                    }
	                }.bind(this));
	            }
	        }

	        // Sets the content of the SideBar and then shows SideBar
	        // for Candidate Focus

	    }, {
	        key: "showCandFocus",
	        value: function showCandFocus(event) {
	            var pscid = void 0;
	            if (event) {
	                pscid = $(event.target).closest(".StudyTrackerRow").attr("id");
	                this.setState({
	                    currentPSCID: pscid,
	                    currentVisit: null,
	                    currentSideBarFocus: "candidate"
	                });
	            } else {
	                pscid = this.state.currentPSCID;
	            }

	            var row = void 0;

	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = this.state.rows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var r = _step5.value;

	                    if (r.pscid === pscid) {
	                        row = r;
	                    }
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            var sideBarContent = React.createElement(SideBarCandContent, {
	                currentCohort: this.state.currentCohort,
	                row: row
	            });

	            this.setState({
	                sideBarContent: sideBarContent
	            });

	            if (event) {
	                this.showSideBar();
	            }
	        }

	        // Sets the content of the SideBar and then shows SideBar
	        // for Visit Focus

	    }, {
	        key: "showVisitFocus",
	        value: function showVisitFocus(event) {
	            var visit = void 0;
	            if (event) {
	                visit = frontToBackVLs.get($(event.target).text());
	                this.setState({
	                    currentVisit: visit,
	                    currentPSCID: null,
	                    currentSideBarFocus: "visit"
	                });
	            } else {
	                visit = this.state.currentVisit;
	            }

	            var sideBarContent = React.createElement(SideBarVisitContent, {
	                visit: visit,
	                currentSite: this.state.currentSite,
	                currentCohort: this.state.currentCohort,
	                rows: this.state.rows
	            });
	            this.setState({ sideBarContent: sideBarContent });

	            if (event) {
	                this.showSideBar();
	            }
	        }
	    }, {
	        key: "showLegend",
	        value: function showLegend(event) {
	            var sideBarContent = React.createElement(Legend, null);

	            this.setState({
	                currentVisit: null,
	                currentPSCID: null,
	                currentSideBarFocus: "legend",
	                sideBarContent: sideBarContent
	            });

	            if (event) {
	                this.showSideBar();
	            }
	        }
	    }, {
	        key: "showSideBar",
	        value: function showSideBar() {
	            $(".SideBar").css("width", SIDEBAR_WIDTH);
	            var selectors = ".study-tracker-table, .study-tracker-header, .filter-container";
	            $(selectors).css("width", COMPRESS_TBL_WIDTH);
	        }
	    }, {
	        key: "closeSideBar",
	        value: function closeSideBar() {
	            $(".SideBar").css("width", "0px");
	            var selectors = ".study-tracker-table, .study-tracker-header, .filter-container";
	            $(selectors).css("width", "100%");

	            this.setState({
	                sideBarContent: null,
	                currentPSCID: null,
	                currentVisit: null,
	                currentSideBarFocus: null
	            });

	            // VL Headers are being kind of stubborn
	            // here is a hacky workaround
	            $(".VLHeader").css("background-color", '');
	        }
	    }, {
	        key: "showFilters",
	        value: function showFilters() {
	            $(".filter-container").toggle('slow');
	            var filtersOpen = !this.state.filtersOpen;
	            this.setState({
	                filtersOpen: filtersOpen
	            });
	        }

	        // Function which is called when cohort filter is changed
	        // event is onChange when the select changes

	    }, {
	        key: "filterCohorts",
	        value: function filterCohorts(event) {
	            var callback = function callback() {};
	            if (this.state.currentSideBarFocus === "visit") {
	                callback = this.showVisitFocus;
	            } else if (this.state.currentSideBarFocus === "candidate") {
	                callback = this.showCandFocus;
	            } else if (this.state.currentSideBarFocus === "candidate_instruments") {
	                callback = this.showCandInstFocus;
	            }
	            this.setState({ currentCohort: event.target.value }, callback);
	        }

	        // Function which will handle team filtering

	    }, {
	        key: "filterTeams",
	        value: function filterTeams(event) {}
	        // Here there should be an AJAX call which fetches a new
	        // data object and then updates the state like:
	        // this.setState({rows: newRows, visitLabels: newVLs});
	        // or something


	        // Function which is called when site filter is changed

	    }, {
	        key: "filterSites",
	        value: function filterSites(event) {
	            var callback = function callback() {};
	            if (this.state.currentSideBarFocus === "visit") {
	                callback = this.showVisitFocus;
	            } else if (this.state.currentSideBarFocus === "candidate") {
	                callback = this.showCandFocus;
	            } else if (this.state.currentSideBarFocus === "candidate_instruments") {
	                callback = this.showCandInstFocus;
	            }
	            this.setState({ currentSite: event.target.value }, callback);
	        }
	    }, {
	        key: "filterCand",
	        value: function filterCand(filterCandText) {
	            this.setState({
	                filterCandText: filterCandText
	            });
	        }
	    }, {
	        key: "switchOrder",
	        value: function switchOrder() {
	            var rows = this.state.rows.reverse();
	            this.setState({ rows: rows });
	        }

	        //Checks to see if a row has a visit with the selected cohort

	    }, {
	        key: "rowHasCurrentCohortVisit",
	        value: function rowHasCurrentCohortVisit(row) {
	            if (this.state.currentCohort === "all") {
	                return true;
	            }
	            var result = false;

	            row.visits.forEach(function (v) {
	                if (v.cohort === this.state.currentCohort) {
	                    result = true;
	                }
	            }.bind(this));
	            return result;
	        }
	    }, {
	        key: "renderRow",
	        value: function renderRow(row) {
	            if (this.rowHasCurrentCohortVisit(row) && (row.psc === this.state.currentSite || this.state.currentSite === "all") && row.pscid.startsWith(this.state.filterCandText.toUpperCase())) {
	                return true;
	            }
	            return false;
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            // Filter out the entire row for candidates at sites other than
	            // the currently selected one or if the candidate has no visits for
	            // the currently selected cohort
	            var dataRows = [];
	            this.state.rows.forEach(function (row) {
	                if (this.renderRow(row)) {
	                    dataRows.push(React.createElement(StudyTrackerRow, {
	                        key: row.pscid,
	                        pscid: row.pscid,
	                        candid: row.candid,
	                        visits: row.visits,
	                        dateReg: row.dateReg,
	                        feedback: row.feedback,
	                        dxReappraisal: row.dxReappraisal,
	                        currentCohort: this.state.currentCohort,
	                        currentVisit: this.state.currentVisit,
	                        currentPSCID: this.state.currentPSCID,
	                        showCandFocus: this.showCandFocus,
	                        showCandInstFocus: this.showCandInstFocus
	                    }));
	                }
	            }.bind(this));
	            if (dataRows.length === 0) {
	                var noMatch = React.createElement(
	                    "p",
	                    null,
	                    "No participants match the current search parameters."
	                );
	            }
	            if (this.state.isLoading) {
	                return React.createElement(
	                    "div",
	                    { className: "center" },
	                    React.createElement("img", {
	                        src: loris.BaseURL + "/images/LORIS_logo.svg",
	                        height: "300px",
	                        width: "400px",
	                        className: "center"
	                    }),
	                    React.createElement(
	                        "h3",
	                        null,
	                        "Loading..."
	                    )
	                );
	            } else {
	                return React.createElement(
	                    "div",
	                    { className: "StudyTracker" },
	                    React.createElement(
	                        "div",
	                        { className: "row study-tracker-header" },
	                        React.createElement(
	                            "div",
	                            { className: "col-md-6" },
	                            React.createElement(
	                                "h3",
	                                { className: "dashboard-header" },
	                                "Study Progression"
	                            )
	                        ),
	                        React.createElement(
	                            "div",
	                            { className: "col-md-6" },
	                            React.createElement(
	                                "h3",
	                                { className: "dashboard-header" },
	                                React.createElement(
	                                    "span",
	                                    { className: "right-align legend-icon",
	                                        onClick: this.showLegend
	                                    },
	                                    "?"
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "row study-tracker-header" },
	                        React.createElement(
	                            "div",
	                            { className: "col-md-6" },
	                            React.createElement(
	                                "h5",
	                                null,
	                                "Total Rows: ",
	                                dataRows.length
	                            )
	                        ),
	                        React.createElement(
	                            "div",
	                            { className: "col-md-6" },
	                            React.createElement(FilterDisplayToggle, {
	                                filtersOpen: this.state.filtersOpen,
	                                showFilters: this.showFilters
	                            })
	                        )
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "row filter-container" },
	                        React.createElement(Filters, {
	                            filterCand: this.filterCand,
	                            sites: this.state.sites,
	                            filterSites: this.filterSites,
	                            teams: this.state.teams,
	                            filterTeams: this.filterTeams,
	                            cohorts: this.state.cohorts,
	                            filterCohorts: this.filterCohorts
	                        })
	                    ),
	                    React.createElement(
	                        "div",
	                        null,
	                        React.createElement(
	                            "table",
	                            { className: "table study-tracker-table" },
	                            React.createElement(StudyTrackerHeader, {
	                                visitLabels: this.state.visitLabels,
	                                currentVisit: this.state.currentVisit,
	                                showVisitFocus: this.showVisitFocus,
	                                switchOrder: this.switchOrder
	                            }),
	                            React.createElement(
	                                "tbody",
	                                null,
	                                dataRows
	                            )
	                        ),
	                        noMatch,
	                        React.createElement(SideBar, {
	                            closeSideBar: this.closeSideBar,
	                            sideBarContent: this.state.sideBarContent,
	                            currentCohort: this.state.currentCohort
	                        })
	                    )
	                );
	            }
	        }
	    }]);

	    return StudyTracker;
	}(React.Component);

	// Returns an object which contains a clean status and styled html to display


	function prettyStatus(status, dueDate) {
	    var html = void 0,
	        toReturn = void 0;

	    toReturn = {
	        "status": "",
	        "html": "",
	        "daysLeft": null
	    };

	    if (!status) return toReturn;

	    if (~status.indexOf("complete")) {
	        html = React.createElement(
	            "span",
	            { className: "complete right-align" },
	            "complete"
	        );
	        toReturn = {
	            "status": "complete",
	            "html": html
	        };
	    } else if (~status.indexOf("deadline-approaching")) {
	        var daysLeft = Math.ceil((new Date(dueDate) - new Date()) * MS_TO_DAYS);
	        var strDaysLeft = daysLeft + "";
	        strDaysLeft += daysLeft == 1 ? " day" : " days";
	        html = React.createElement(
	            "span",
	            { className: "deadline-approaching right-align" },
	            "due in ",
	            strDaysLeft
	        );
	        toReturn = {
	            "status": "deadline-approaching",
	            "html": html,
	            "daysLeft": daysLeft
	        };
	    } else if (~status.indexOf("deadline-past")) {
	        var daysPast = Math.ceil((new Date() - new Date(dueDate)) * MS_TO_DAYS);
	        var strDaysPast = daysPast + "";
	        strDaysPast += daysPast == 1 ? " day" : " days";
	        html = React.createElement(
	            "span",
	            { className: "deadline-past right-align" },
	            strDaysPast,
	            " late"
	        );
	        toReturn = {
	            "status": "deadline-past",
	            "html": html,
	            "daysLeft": -daysPast
	        };
	    } else if (~status.indexOf("cancelled")) {
	        html = React.createElement(
	            "span",
	            { className: "cancelled right-align" },
	            "visit cancelled"
	        );
	        toReturn = {
	            "status": "cancelled",
	            "html": html
	        };
	    } else if (~status.indexOf("no-deadline")) {
	        html = React.createElement(
	            "span",
	            { className: "no-deadline right-align" },
	            "no deadline specified"
	        );
	        toReturn = {
	            "status": "no-deadline",
	            "html": html
	        };
	    }

	    return toReturn;
	}

	function formatDate(date) {
	    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	    var day = date.getDate();
	    var monthIndex = date.getMonth();
	    var year = date.getFullYear();

	    return monthNames[monthIndex] + ' ' + day + ', ' + year;
	}

	function openBVLFeedback(candID, sessionID, commentID, testName) {
	    var url = loris.BaseURL + "/";
	    if (candID && sessionID && commentID && testName) {
	        url += testName + "/?commentID=" + commentID + "&sessionID=" + sessionID + "&candID=" + candID;
	    } else if (candID && sessionID) {
	        url += "instrument_list/?candID=" + candID + "&sessionID=" + sessionID;
	    } else if (candID) {
	        url += candID;
	    } else {
	        return;
	    }
	    var win = window.open(url, "_blank");
	    win.onload = function () {
	        win.document.querySelector("a.navbar-toggle").dispatchEvent(new MouseEvent("click"));
	    };
	}

	function openConflictResolver(candID, testName, e) {
	    loris.loadFilteredMenuClickHandler('conflict_resolver/', {
	        CandID: candID,
	        Instrument: testName
	    })(e);
	}

	exports.default = StudyTracker;

/***/ }

/******/ });