import React, { Component } from 'react';
import { Header, Modal, Divider } from 'semantic-ui-react';

class FolkModal extends Component {
  render() {
    let { folkData, show, onModalClose } = this.props
    return (
      folkData &&
      <Modal open={show} onClose={onModalClose} dimmer="inverted" size="small">
        <Modal.Header>
          {`${folkData.Name} CR ${folkData.CR}`}
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description className="folk-modal">
            <Header>{`XP ${folkData.XP}`}</Header>
            <p>{`${folkData.Alignment} ${folkData.AgeCategory} ${folkData.Race}`}</p>
            <p>{`Init: ${folkData.Init}; Senses: ${folkData.Senses}`}</p>
            <p>{`Aura: ${folkData.Aura}`}</p>
            <Divider content="Defense" section horizontal />
            <p>{`AC ${folkData.AC}; ${folkData.AC_Mods}`}</p>
            <p>{`hp ${folkData.HP} ${folkData.HD}`}</p>
            <p>{`${folkData.Saves}`}</p>
            <Divider content="Offense" section horizontal />
            <p>{`Speed ${folkData.Speed}`}</p>
            <p>{`Melee ${folkData.Melee}`}</p>
            <p>{`Space ${folkData.Space}; Reach ${folkData.Reach}`}</p>
            <p>{`Spell-Like Abilities ${folkData.SpellLikeAbilities}`}</p>
            <Divider content="Statistics" section horizontal />
            <p>{`${folkData.AbilityScores}`}</p>
            <p>{`Base Atk ${folkData.BaseAtk}; CMB ${folkData.CMB}; CMD ${folkData.CMD}`}</p>
            <p>{`Feats: ${folkData.Feats}`}</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default FolkModal;