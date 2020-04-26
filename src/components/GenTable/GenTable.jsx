import React,{ Component} from "react";
import Table from 'react-bootstrap/Table';
import classes from './GenTable.module.css';


class GenTable extends Component{

    render(){

        const tblHead = this.props.names.map((data, index)=>{
            return(
                <th key={index}>{data}</th>
            );
        })

        const tblData = this.props.data.map( (data,index)=>{
            let temp = [];
            for( let d in data){
                temp.push(<td key={d}>{data[d]}</td>) ;
            }
            return(
                <tr key={index }>
                    {temp}
                </tr>
            )
        });

        return(
            <React.Fragment>
                <h2>{this.props.heading}</h2>
                <Table striped bordered hover className={classes.Table}>
                    <thead>
                        <tr>
                            {tblHead}
                        </tr>
                    </thead>
                    <tbody>
                        {tblData}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }

}
export default GenTable;