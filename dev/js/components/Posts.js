	"use strict";
	import React, {Component} from "react";
	import {connect} from "react-redux";
	import moment from 'moment'
	import Select from 'react-select'
	import {Link} from 'react-router'
	import AddPost from '../actions/AddPost'
	import DeletePost from '../actions/DeletePost'
	import InputMask from 'react-input-mask';
	import orderBy from 'lodash.orderby'
	import {sortByAgeAsc,sortByAgeDesc} from '../utils'

	class Posts extends Component {
		constructor(props){
			super(props)
			this.changeValueFirstName=this.changeValueFirstName.bind(this)
			this.changeValueLastName=this.changeValueLastName.bind(this)
			this.changeValueGender=this.changeValueGender.bind(this)
			this.changeValueAge=this.changeValueAge.bind(this)
			this.changeValuePhone=this.changeValuePhone.bind(this)
			this.validateForm=this.validateForm.bind(this)
			this.addNewPost=this.addNewPost.bind(this)
			this.validatePhone=this.validatePhone.bind(this)
			this.deletePost=this.deletePost.bind(this)
			this.sortTable=this.sortTable.bind(this)


			this.state={
				firstName:'',
				lastName:'',
				gender:'',
				age:'',
				phone:'',
				errors:[],
				keyWord:"firstName",
				predicat:"asc"
			}
		}
		componentDidMount(){
			if(localStorage.posts){
				const oldState = JSON.parse(localStorage.posts);
				oldState.map(item=>{
				this.props.dispatch(AddPost(item))
				})
			}
			            

		}
		 changeValueFirstName(e){
		 	let newErrors=this.state.errors
		 		if(newErrors.indexOf("firstName")!==-1){
					  newErrors.splice(newErrors.indexOf("firstName"),1)
				}
				this.setState({firstName:e.target.value,errors:newErrors})
		}
		changeValueLastName(e){
			let newErrors=this.state.errors
		 		if(newErrors.indexOf("lastName")!==-1){
					  newErrors.splice(newErrors.indexOf("lastName"),1)
				}
				this.setState({lastName:e.target.value,errors:newErrors})
		}
		changeValueGender(e){
			let newErrors=this.state.errors
		 		if(newErrors.indexOf("gender")!==-1){
					  newErrors.splice(newErrors.indexOf("gender"),1)
				}
			this.setState({gender:e,errors:newErrors})
		}
		changeValueAge(e){
			let newErrors=this.state.errors
		 		if(newErrors.indexOf("age")!==-1){
					  newErrors.splice(newErrors.indexOf("age"),1)
				}
			this.setState({age:e.target.value,errors:newErrors})			
		}
		changeValuePhone(e){
			let newErrors=this.state.errors
			if(this.validatePhone()){
		 		if(newErrors.indexOf("phone")!==-1){
					  newErrors.splice(newErrors.indexOf("phone"),1)
				}
			}
			this.setState({phone:e.target.value,errors:newErrors})			
		}
		validatePhone(){
			const phoneValid = /380[0-9]{9}$/;
      		const sp = /[^0-9]/g;
      		const telNormalize = this.state.phone.replace(sp, '');
      		if (phoneValid.test(telNormalize)) {
      			
				return true
			}else{
				return false
			}
		}
		validateForm(){

			let errorsInForm=this.state.errors
			if(this.validatePhone()){
					if(errorsInForm.indexOf("phone")!==-1){
					 errorsInForm.splice(errorsInForm.indexOf("phone"),1)
				}
			}else{
      				if(errorsInForm.indexOf("phone")===-1){
					errorsInForm.push("phone")
					}
      		}
   
			if(this.state.firstName.length<1){
					if(errorsInForm.indexOf("firstName")===-1){
						errorsInForm.push("firstName")

					}
			}else{
				if(errorsInForm.indexOf("firstName")!==-1){
					errorsInForm.splice(errorsInForm.indexOf("firstName"),1)
				}
			}
			if(this.state.lastName.length<1){
					if(errorsInForm.indexOf("lastName")===-1){
						errorsInForm.push("lastName")

					}
			}else{
				if(errorsInForm.indexOf("lastName")!==-1){
					errorsInForm.splice(errorsInForm.indexOf("lastName"),1)
				}
			}
			if(this.state.age.length<1){
					if(errorsInForm.indexOf("age")===-1){
						errorsInForm.push("age")

					}
			}else{
				if(errorsInForm.indexOf("age")!==-1){
					errorsInForm.splice(errorsInForm.indexOf("age"),1)
				}
			}
			if(!this.state.gender){
					if(errorsInForm.indexOf("gender")===-1){
						errorsInForm.push("gender")

					}
			}else{
				if(errorsInForm.indexOf("gender")!==-1){
					errorsInForm.splice(errorsInForm.indexOf("gender"),1)
				}
			}
    		this.setState({errors:errorsInForm})
    		if(errorsInForm.length===0){
    				return true
    			}else{
    				return false
    			}
		}
		addNewPost(){
			if(this.validateForm()){
				this.props.dispatch(AddPost({
					firstName:this.state.firstName,
					lastName:this.state.lastName,
					gender:this.state.gender.label,
					age:this.state.age,
					phone:this.state.phone,
					id:Math.random()
				}))
				this.setState({
					firstName:'',
					lastName:'',
					gender:'',
					age:'',
					phone:'',
				})
			}
		}

		deletePost(id){
			this.props.dispatch(DeletePost(id))
		}

		sortTable(e){
			if(e==="firstName"){
				if(this.state.keyWord==="firstName"){
					this.state.predicat==="asc"?this.setState({predicat:"desc"}):this.setState({predicat:"asc"})
				}else{
				this.setState({keyWord:"firstName",predicat:"asc"})
				}
			}
			if(e==="lastName"){
				if(this.state.keyWord==="lastName"){
					this.state.predicat==="asc"?this.setState({predicat:"desc"}):this.setState({predicat:"asc"})
				}else{
				this.setState({predicat:"asc",keyWord:"lastName"})
				}
			}
			if(e==="gender"){
				if(this.state.keyWord==="gender"){
					this.state.predicat==="asc"?this.setState({predicat:"desc"}):this.setState({predicat:"asc"})
				}else{
				this.setState({predicat:"asc",keyWord:"gender"})
				}
			}
			if(e==="age"){
				if(this.state.keyWord==="age"){
					this.state.predicat==="asc"?this.setState({predicat:"desc"}):this.setState({predicat:"asc"})
				}else{
				this.setState({predicat:"asc",keyWord:"age"})
				}
			}
			if(e==="phone"){
				if(this.state.keyWord==="phone"){
					this.state.predicat==="asc"?this.setState({predicat:"desc"}):this.setState({predicat:"asc"})
				}else{
				this.setState({predicat:"asc",keyWord:"phone"})
				}
			}
		}

		render() {
			let sorting,keyWord,predicat
			keyWord=this.state.keyWord
			predicat=this.state.predicat
			if(keyWord==="age"){
				if(predicat==="asc"){
					this.props.Posts.data.length>0?
					sorting=this.props.Posts.data.sort(sortByAgeAsc):sorting=null
				}else{
					this.props.Posts.data.length>0?
					sorting=this.props.Posts.data.sort(sortByAgeDesc):sorting=null
				}
			}else{
				this.props.Posts.data.length>0?
				sorting=orderBy(this.props.Posts.data, function(e) { return e[keyWord]}, [predicat]):sorting=null
			}
			
			return <div className="container">
						<div className="row">
							<div className="col-lg-12">
							{this.props.Posts.data.length>0?

								<div className="table-scrollable">
                               	 	<table className="table table-hover table-striped table-condensed">
                               	 		<thead>
                               	 		<tr>
                               	 			<th	onClick={this.sortTable.bind(this,'firstName')}>
                               	 			First Name
                               	 				{keyWord==="firstName"&&predicat==="asc"?
                               	 				<i className="glyphicon glyphicon-triangle-top"/>:
                               	 				keyWord==="firstName"&&predicat==="desc"?
                               	 				<i className="glyphicon glyphicon-triangle-bottom"/>:null}
                               	 			</th>
                               	 			<th onClick={this.sortTable.bind(this,'lastName')}>
                               	 			Last Name
                               	 				{keyWord==="lastName"&&predicat==="asc"?
                               	 				<i className="glyphicon glyphicon-triangle-top"/>:
                               	 				keyWord==="lastName"&&predicat==="desc"?
                               	 				<i className="glyphicon glyphicon-triangle-bottom"/>:null}
                               	 			</th>
                               	 			<th onClick={this.sortTable.bind(this,'gender')}>
                               	 			Gender
                               	 				{keyWord==="gender"&&predicat==="asc"?
                               	 				<i className="glyphicon glyphicon-triangle-top"/>:
                               	 				keyWord==="gender"&&predicat==="desc"?
                               	 				<i className="glyphicon glyphicon-triangle-bottom"/>:null}
                               	 			</th>
                               	 			<th onClick={this.sortTable.bind(this,'age')}>
                               	 			Age
                               	 				{keyWord==="age"&&predicat==="asc"?
                               	 				<i className="glyphicon glyphicon-triangle-top"/>:
                               	 				keyWord==="age"&&predicat==="desc"?
                               	 				<i className="glyphicon glyphicon-triangle-bottom"/>:null}
                               	 			</th>
                               	 			<th onClick={this.sortTable.bind(this,'phone')}>
                               	 			Phone
                               	 				{keyWord==="phone"&&predicat==="asc"?
                               	 				<i className="glyphicon glyphicon-triangle-top"/>:
                               	 				keyWord==="phone"&&predicat==="desc"?
                               	 				<i className="glyphicon glyphicon-triangle-bottom"/>:null}
                               	 			</th>
                               	 			<th>#</th>
                               	 			</tr>
                               	 		</thead>
										
										<tbody>
										{sorting.map((item,key)=>{
											return <tr key={key}>
														<td>{item.firstName}</td>
														<td>{item.lastName}</td>
														<td>{item.gender}</td>
														<td>{item.age}</td>
														<td>{item.phone}</td>
														<td><button 
														className="btn red"
														onClick={this.deletePost.bind(this,item.id)}
														>Delete</button></td>
												   </tr>
                               	 				
											})
										}
										</tbody>
								
									</table>
                                </div>
                                :null}
								</div>
							
						</div>
							<div className="row">
								<div className="col-lg-4 col-lg-offset-1">

									<div className={this.state.errors.indexOf("firstName")!==-1?
									"form-group has-error"
									:"form-group"}>

										<input type="text" className="form-control"
										  	onChange={this.changeValueFirstName}
										  	placeholder="First Name"
										  	value={this.state.firstName}/>
									</div>
								</div>
								<div className="col-lg-4 col-lg-offset-1">
									<div className={this.state.errors.indexOf("lastName")!==-1?
									"form-group has-error"
									:"form-group"}>

										  <input type="text" className="form-control"
										  onChange={this.changeValueLastName}
										  placeholder="Last Name"
										  value={this.state.lastName}/>
									</div>
								</div>
							</div>
							<div className="row">

								<div className="col-lg-4 col-lg-offset-1">
									<div className="form-group">
										  <Select  
										  onChange={this.changeValueGender}
										  placeholder="Gender"
										  style={this.state.errors.indexOf("gender")!==-1?{borderColor:"#a94442"}:null}
										  value={this.state.gender}
										  options={[{value:"male",label:"Male"},{value:"female",label:"Female"}]}/>
									</div>
								</div>
							<div className="col-lg-4 col-lg-offset-1">
								<div className={this.state.errors.indexOf("age")!==-1?
									"form-group has-error"
									:"form-group"}>

										  <input type="number" className="form-control"
										  onChange={this.changeValueAge}
										  placeholder="Age"
										  value={this.state.age}/>
								</div>
							</div>
							</div>
								<div className="row">

							<div className="col-lg-4 col-lg-offset-1">
								<div className={this.state.errors.indexOf("phone")!==-1?
											"form-group has-error"
											:"form-group"}>
									<InputMask
                            		type="text"
                            		mask="38 (099) 999-99-99"
                            		value={this.state.phone}
                            		onChange={this.changeValuePhone}
                            		placeholder="Phone"
                            		className="form-control"
                            		/>

								</div>
							</div>
								<div className="col-lg-4 col-lg-offset-1">
									<div className="form-group">
											<button 
											className="btn btn-primary"
	        								onClick={this.addNewPost}
	        								 type="button">
	        								 Сохранить!
	        								 </button>
	        						</div>
								</div>
							</div>
					</div>
						

		}
	}

	export default connect(store => store)(Posts);