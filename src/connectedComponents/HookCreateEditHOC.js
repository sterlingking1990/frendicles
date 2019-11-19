import React from 'react'

export default class HookCreateEditHOC extends React.Component {
        constructor(props){
        super(props);
            this.state = { hook: props.hooks ? props.hooks.hook : '', description: props.hooks ? props.hooks.description : '', error:'' }
        this.setHook=this.setHook.bind(this);
            this.setDescription = this.setDescription.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }

    setHook = (e) => {
        const hook = e.target.value;
        this.setState(() => ({ hook }))
    }

    setDescription = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }))
    }

    submitForm=(e)=>{
        e.preventDefault();
        if(!this.state.hook){
            this.setState(()=>({error:'Sorry, please enter a value'}))
        }
        else{
        this.props.onSubmit({hook:this.state.hook,description:this.state.description})
        this.setState(()=>({error:''}))
        }
    }


    render() {

        return (
            <div id="create-hook">
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-12 sm-12">
                            <h3 className="display-4 text-center">{this.props.title}</h3>
                            {this.state.error && <p className="text-white bg-dark text-center">{this.state.error}</p>}
                            <div className="form-group">
                                <input type="text" className="form-control" value={this.state.hook} onChange={this.setHook} />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" cols="6" rows="5" value={this.state.description} onChange={this.setDescription} />
                            </div>
                            <div className="form-group">
                                <button className="form-control my-3 bg-dark text-white" onClick={this.submitForm}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}