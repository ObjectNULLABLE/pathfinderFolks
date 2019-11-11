import React, { Component } from 'react';
import { Header, Modal, Divider, Container } from 'semantic-ui-react';

class FolkModal extends Component {
  render() {
    let { folkData, show, onModalClose } = this.props
    return (
      folkData &&
      <Modal open={show} onClose={onModalClose} dimmer="inverted" size="small">
        <Modal.Header>
          {`${folkData.name} CR ${folkData.cr}`}
        </Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description className="folk-modal">
            <Header>{`XP ${folkData.xp}`}</Header>
            <p>{`${folkData.alignment} ${folkData.ageCategory} ${folkData.Race}`}</p>
            <p>{`Init: ${folkData.init}; Senses: ${folkData.senses}`}</p>
            <p>{`Aura: ${folkData.aura}`}</p>
            <Divider content="Defense" section horizontal />
            <p>{`AC ${folkData.ac}; ${folkData.acMods}`}</p>
            <p>{`hp ${folkData.hp} ${folkData.hd}`}</p>
            <p>{`${folkData.saves}`}</p>
            <Divider content="Offense" section horizontal />
            <p>{`Speed ${folkData.speed}`}</p>
            <p>{`Melee ${folkData.melee}`}</p>
            <p>{`Space ${folkData.space}; Reach ${folkData.reach}`}</p>
            <p>{`Spell-Like Abilities ${folkData.spellLikeAbilities}`}</p>
            <Divider content="Statistics" section horizontal />
            <p>{`${folkData.abilityScores}`}</p>
            <p>{`Base Atk ${folkData.baseAtk}; CMB ${folkData.cmb}; CMD ${folkData.cmd}`}</p>
            <p>{`Feats: ${folkData.feats}`}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default FolkModal;