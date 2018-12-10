export class Teams {

  // returns the short form of the team it guesses is in the string
  // returns empty string if no match found
  public guess(team: string): string {
    if (~team.indexOf('aptors')) {
      return 'TOR'
    }

    if (~team.indexOf('arriors')) {
      return 'GSW'
    }

    if (~team.indexOf('eltics')) {
      return 'BOS'
    }

    if (~team.indexOf('uggets')) {
      return 'DEN'
    }

    if (~team.indexOf('ucks')) {
      return 'MIL'
    }

    if (~team.indexOf('acers')) {
      return 'IND'
    }

    if (~team.indexOf('lazers')) {
      return 'POR'
    }

    if (~team.indexOf('purs')) {
      return 'SAS'
    }

    if (~team.indexOf('ixers') || ~team.indexOf('6ers')) {
      return 'PHL'
    }

    if (~team.indexOf('rizz')) {
      return 'MEM'
    }

    if (~team.indexOf('azz')) {
      return 'UTA'
    }

    if (~team.indexOf('ockets')) {
      return 'HOU'
    }

    if (~team.indexOf('hunder')) {
      return 'OKC'
    }

    if (~team.indexOf('lippers')) {
      return 'LAC'
    }

    if (~team.indexOf('akers')) {
      return 'LAL'
    }

    if (~team.indexOf('elicans')) {
      return 'NOP'
    }

    if (~team.indexOf('istons')) {
      return 'DET'
    }

    if (~team.indexOf('ornets')) {
      return 'CHA'
    }

    if (~team.indexOf('olves')) {
      return 'MIN'
    }

    if (~team.indexOf('nicks')) {
      return 'NYK'
    }

    if (~team.indexOf('avericks')) {
      return 'DAL'
    }

    if (~team.indexOf('izards')) {
      return 'WSH'
    }

    if (~team.indexOf('ulls')) {
      return 'CHI'
    }

    if (~team.indexOf('avaliers')) {
      return 'CLE'
    }

    if (~team.indexOf('awks')) {
      return 'ATL'
    }

    if (~team.indexOf('ings')) {
      return 'SAC'
    }

    if (~team.indexOf('agic')) {
      return 'ORL'
    }

    if (~team.indexOf('eat')) {
      return 'MIA'
    }

    if (~team.indexOf('ets')) {
      return 'BKN'
    }

    if (~team.indexOf('uns')) {
      return 'PHX'
    }

    return ''
  }
}
