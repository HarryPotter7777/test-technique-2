import React, { Component } from "react";
import { connect } from "react-redux";
import { add, update, findAll, complete, updateState } from "../actions/todo";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Modal from './modal';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import ButtonGroup from '@mui/material/ButtonGroup';

class Todo extends Component {
    state = {
        title: '',
        description: '',
        toggleModal: {}
    }

    componentDidMount() {
        this.props.findAll();
    }

    handleText(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    handleModal(todo) {
        const { id } = todo;
        this.setState(prevState => {
            let newState = {};
            newState[`${id}`] = prevState.toggleModal[id] ? !prevState.toggleModal[id] : true;
            return {
                toggleModal: { ...prevState.toggleModal, ...newState }
            }
        });
    }

    add() {
        this.props.add({
            title: this.state.title,
            description: this.state.description
        });
    }

    complete(todo) {
        this.props.complete(todo);
    }

    updateState(todo, type, e) {
        let update = {};
        update[`${type}`] = e.target.value;
        this.props.updateState({ ...todo, ...update });
    }

    update(todo) {
        this.props.update(todo);
    }

    save(todo) {
        this.props.update(todo);
        this.handleModal(todo);
    }

    render() {
        return (
            <Container>
                <Box sx={{ bgcolor: "#fafafa", px: 6, py: 2, minHeight: "100vh" }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mb: 6 }}>
                        <Stack spacing={2} sx={{ pt: 2 }}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" color="primary"
                                focused onChange={this.handleText.bind(this)} required />
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Description"
                                style={{ width: 400, height: 100 }}
                                onChange={this.handleDescription.bind(this)}
                            />
                            <Button variant="contained" onClick={this.add.bind(this)}> New </Button>
                        </Stack>
                    </Grid>
                    <List sx={{ width: '100%' }} component="nav" aria-label="mailbox folders">
                        {
                            this.props.todos.map((todo, i) => {
                                return (
                                    <div key={todo.id}>
                                        <ListItem sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                            <ListItemText onClick={this.handleModal.bind(this, todo)}
                                                sx={{ cursor: 'pointer' }}>
                                                {todo.title}
                                            </ListItemText>
                                            <Modal toggle={this.state.toggleModal[todo.id] || false} close={this.handleModal.bind(this, todo)}>
                                                <Grid item xs={12} sm={12}>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <Stack spacing={2} sx={{ pt: 2 }}>
                                                            <TextField id="outlined-basic" label="Title" variant="outlined"
                                                                color="primary" focused
                                                                onChange={this.updateState.bind(this, todo, 'title')}
                                                                defaultValue={todo.title}
                                                                required
                                                            />
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Description
                                                            </Typography>
                                                            <Divider style={{ marginTop: '0.3rem' }} />
                                                            <TextareaAutosize
                                                                aria-label="empty textarea"
                                                                placeholder="Description"
                                                                style={{ width: 400, height: 100, marginTop: '1.5em', marginBottom: '0.5em' }}
                                                                defaultValue={todo.description}
                                                                onChange={this.updateState.bind(this, todo, 'description')}
                                                            />
                                                            <ButtonGroup variant="contained" disableElevation>
                                                                <Grid container justifyContent='space-between'>
                                                                    <Button variant="contained" startIcon={<SaveIcon />}
                                                                        onClick={this.save.bind(this, todo)}>
                                                                        Save
                                                                    </Button>
                                                                    <Button variant="contained" startIcon={<ClearIcon />} color="error"
                                                                        onClick={this.handleModal.bind(this, todo)}>
                                                                        Cancel
                                                                    </Button>
                                                                </Grid>
                                                            </ButtonGroup>
                                                        </Stack>
                                                    </Box>
                                                </Grid>
                                            </Modal>
                                            <Box justifyContent="flex-end">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox checked={todo.completed}
                                                            onChange={this.complete.bind(this, todo)} />
                                                    }
                                                    label=""
                                                />
                                            </Box>
                                        </ListItem>
                                        {i !== this.props.todos.length - 1 && <Divider />}
                                    </div>
                                );
                            })
                        }
                    </List>
                </Box>
            </Container >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.data,
    };
};

export default connect(mapStateToProps, { add, update, updateState, findAll, complete })(Todo);