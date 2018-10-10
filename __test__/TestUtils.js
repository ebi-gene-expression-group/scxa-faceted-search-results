import React from 'react'
import PropTypes from 'prop-types'

const EpisodeCard = ({title}) =>
  <div>
    <p>{title}</p>
  </div>

EpisodeCard.propTypes = {
  title: PropTypes.string.isRequired
}

// Stolen from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const vindicators = [
  { group:`Vindicator`, value: `supernova`, label: `Supernova`, disabled: false},
  { group:`Vindicator`, value: `noob-noob`, label: `Noob-Noob`, disabled: false},
  { group:`Vindicator`, value: `vance_maximus`, label: `Vance Maximus`, disabled: false},
  { group:`Vindicator`, value: `alan_rails`, label: `Alan Rails`, disabled: false},
  { group:`Vindicator`, value: `crocubot`, label: `Crocubot`, disabled: false},
  { group:`Vindicator`, value: `million_ants`, label: `Million Ants`, disabled: false},
  { group:`Vindicator`, value: `morty_smith`, label: `Morty Smith`, disabled: false},
  { group:`Vindicator`, value: `rick_sanchez`, label: `Rick Sanchez`, disabled: false},
  { group:`Vindicator`, value: `lady_katana`, label: `Lady Katana`, disabled: false},
  { group:`Vindicator`, value: `calypso`, label: `Calypso`, disabled: false},
  { group:`Vindicator`, value: `diablo_verde`, label: `Diablo Verde`, disabled: false}
]

const episodes = [
  {
    element: {
      title: `Raising Gazorpazorp`
    },
    facets: [
      {
        group: `Planet`,
        value: `gazorpazorp`,
        label: `Gazorpazorp`,
        description: `Planet Tooltip`
      },
      {
        group: `Guest character`,
        value: `gwendolyn`,
        label: `Gwendolyn`,
        description: `Guest character Tooltip`
      },
      {
        group: `Guest character`,
        value: `ma-sha`,
        label: `Ma-Sha`,
        description: `Guest character Tooltip`
      },
      {
        group: `Season`,
        value: `1`,
        label: `Season 1`,
        description: `Season Tooltip`
      }
    ]
  },
  {
    element: {
      title: `The wedding squanchers`
    },
    facets: [
      {
        group: `Planet`,
        value: `squanch`,
        label: `Squanch`,
        description: `Planet Tooltip`
      },
      {
        group: `Guest character`,
        value: `birdperson`,
        label: `Birdperson`,
        description: `Guest character Tooltip`
      },
      {
        group: `Guest character`,
        value: `squanchy`,
        label: `Squanchy`,
        description: `Guest character Tooltip`
      },
      {
        group: `Season`,
        value: `2`,
        label: `Season 2`,
        description: `Season Tooltip`
      }
    ]
  },
  {
    element: {
      title: `The Rickshank redemption`
    },
    facets: [
      {
        group: `Guest character`,
        value: `birdperson`,
        label: `Birdperson`,
        description: `Guest character Tooltip`
      },
      {
        group: `Planet`,
        value: `buttworld`,
        label: `Buttworld`,
        description: `Planet Tooltip`
      },
      {
        group: `Season`,
        value: `3`,
        label: `Season 3`,
        description: `Season Tooltip`
      }
    ]
  },
  {
    element: {
      title: `Ricksy business`
    },
    facets: [
      {
        group: `Guest character`,
        value: `squanchy`,
        label: `Squanchy`,
        description: `Guest character Tooltip`
      },
      {
        group: `Guest character`,
        value: `abradolf_lincler`,
        label: `Abradolf Lincler`,
        description: `Guest character Tooltip`
      },
      {
        group: `Season`,
        value: `1`,
        label: `Season 1`,
        description: `Season Tooltip`
      }
    ]
  },
  {
    element: {
      title: `Close Rick-counters of the Rick kind`
    },
    facets: [
      {
        group: `Guest character`,
        value: `ricktiminus_sancheziminius`,
        label: `Ricktiminus Sancheziminius`,
        description: `Guest character Tooltip`
      },
      {
        group: `Guest character`,
        value: `abradolf_lincler`,
        label: `Abradolf Lincler`,
        description: `Guest character Tooltip`
      },
      {
        group: `Planet`,
        value: `buttworld`,
        label: `Buttworld`,
        description: `Planet Tooltip`
      },
      {
        group: `Season`,
        value: `1`,
        label: `Season 1`,
        description: `Season Tooltip`
      }
    ]
  }
]

export {getRandomInt, vindicators, episodes, EpisodeCard}
