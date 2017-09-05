import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import {default as keymapper} from '../../../../../utils/keys';

class App extends Component {
	constructor(props) {
		super(props);

		// Actions from View
		this.submit = this.submit.bind(this);
		this.keydown = this.keydown.bind(this);
		this.selectTab = this.selectTab.bind(this);

		// Actions to background
		this.createTab = this.createTab.bind(this);
		this.getAllTabs = this.getAllTabs.bind(this);

		// Local Variables
		this.category = '';
		this.show = false;
	}

	componentDidMount() {
		// Key press Events. Need to optimize the work
		let self = this;
		window.addEventListener('keydown', (e) => {
			let {isCtrlShiftL,isEscape} = keymapper(e);
			if (isCtrlShiftL) {
				this.show = !this.show;
				this.searchInput.value = '';
				this.forceUpdate();
			} else if(isEscape) {
				this.show = false;
				this.searchInput.value = '';
				this.forceUpdate();
			}
		});
		let backdrop = document.querySelector('.tabswitcher-backdrop');
		backdrop.onclick =  function(){
			self.searchInput.focus();
		};
	}

	componentDidUpdate() {
		// Focus the input element on render
		if (this.show && this.searchInput) {
			this.searchInput.focus();
		}
	}

	selectTab(tab, e) {
		this.props.dispatch({
			type: 'SELECT_TAB',
			tab: tab
		});
		this.show = false;
		this.forceUpdate()
	}

	submit(e) {
		e.preventDefault();
		// this.createTab();
		this.getAllTabs();
	}

	keydown(e) {
		let TABKEY = 13;
		let UPARROWKEY = 38;
		let DOWNARROWKEY = 40;
		// e.preventDefault();
		let keycode = e.keyCode || e.which;
		let value = (e.target.value || "").toLowerCase();
		if (keycode === 9) {//TAB_KEY
			e.preventDefault();
			console.log("this happens", e.keyCode, value, this);
		} else if (keycode === 13) {
			this.props.dispatch({
				type: 'SELECT_TAB'
			});
			this.show = false;
			e.target.value = '';
			this.forceUpdate();
		} else if(keycode === UPARROWKEY) {
			this.props.dispatch({
				type: 'SELECT_PREV'
			});
		} else if(keycode === DOWNARROWKEY) {
			this.props.dispatch({
				type: 'SELECT_NEXT'
			});
		} else {
			this.props.dispatch({
				type: 'FILTER_TAB',
				text: value
			});
		}
	}
	keyup(e) {
		e.preventDefault();
		console.log("this happens", e);
	}

	createTab() {
		/*this.props.dispatch({
		  type: 'CREATE_URL'
		}); */
		var tab = this.props.dispatch({
			type: 'CURRENT_TAB'
		});
		tab.then(function (e) {
			console.log("tab", tab);
			console.log("tab", e);
		});

	}

	getAllTabs() {
		var t = this.props.dispatch({
			type: 'ALL_TAB'
		});
		console.log("all tab", t);
	}

	render() {
		let category = this.category || "Search Tabs";
		let categoryspan;
		let showClass = this.show ? 'tabswitcher-container ' : 'tabswitcher-container tabswitcher-hide';
		let showBackdropClass = this.show ? 'tabswitcher-backdrop ' : 'tabswitcher-backdrop tabswitcher-hide';
		if (category) {
			categoryspan = `<span class="tabswitcher-category">${category} : </span>`;
		}
		let tabs = this.props.tabs.filteredTabs || [];
		// will be another function.
		var rows = [];
		for (var i = 0; i < tabs.length; i++) {
			let currentTab = tabs[i];
			let className = i===this.props.tabs.currentIndex?'selected':'';
			let img = <img className="tabswitcher-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==" />;
			if (currentTab.favIconUrl) {
				img = <img className="tabswitcher-icon" src={currentTab.favIconUrl} />;
			}
			rows.push(<li className={className} onClick={(e) => { this.selectTab(currentTab, e) }}>{img}{currentTab.title}</li>);
		}
		if (tabs.length === 0) {
			rows = '';
		}
		return (
			<div>
				<div className={showBackdropClass}></div>
				<div className={showClass}>
					<form onSubmit={(e) => this.submit(e)} className="tabswitcher-form-group">
						<span dangerouslySetInnerHTML={{ __html: category }} /><input type="text" ref={(input) => { this.searchInput = input; }} onKeyUp={(e) => this.keydown(e)} />
					</form>
					<ul>
						{rows}
					</ul>
				</div>
			</div>
		);
	}
}

/*
    Count: {this.props.count}
    Current Tab : {this.props.tabs.currentTab}

*/

const mapStateToProps = (state) => {
	actionOnChangeState(state);
	return {
		count: state.count || 0,
		tabs: state.tabs || {},
		currentTab: state.currentTab || {},
		search: state.search || "",
		type: state.type || null
	};
};

export default connect(mapStateToProps)(App);


// Actions from background will be written here
function actionOnChangeState(state) {

}

