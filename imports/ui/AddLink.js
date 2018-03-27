import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';


export default class AddLink extends React.Component {
  constructor (props) {
    super(props);
    Modal.setAppElement(document.getElementById('app'));
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      error: '',
      url: '',
      showModal: false
    };
  }
  onSubmit (e) {
    const { url } = this.state;
    e.preventDefault();

    if (url) {
      Meteor.call('link.insert', url, (e, r) => {
        if (e) {
          this.setState({error: e.message});
        } else {
          this.closeModal();
        }
      });
    }
  }
  onChange (e) {
    this.setState({url: e.target.value.trim()});
  }
  openModal () {
    this.setState({ showModal: true });
  }
  closeModal () {
    this.setState({
      showModal: false,
      url: '',
      error: ''
    });
  }
  render () {
    return (
      <div>
        <button className="button" onClick={this.openModal}>Ajouter un lien</button>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.inputUrl.focus()}
          onRequestClose={this.closeModal}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="box-view__form"  onSubmit={this.onSubmit}>
            <input
              ref="inputUrl"
              type="text"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange}
            />
            <button type="submit" className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.closeModal}>Fermer</button>
          </form>
        </Modal>
      </div>
    );
  }
}
