export class Teams {
  public guess(team: string): string {
    if (~team.indexOf('aptors')) {
      return 'TOR'
    } else if (~team.indexOf('arriors')) {
      return 'GSW'
    } else if (~team.indexOf('ucks')) {
      return 'MIL'
    } else if (~team.indexOf('eltics')) {
      return 'BOS'
    } else if (~team.indexOf('uggets')) {
      return 'DEN'
    } else if (~team.indexOf('acers')) {
      return 'IND'
    } else if (~team.indexOf('lazers')) {
      return 'POR'
    } else if (~team.indexOf('purs')) {
      return 'SAS'
    } else if (~team.indexOf('ixers') || ~team.indexOf('76ers')) {
      return 'PHL'
    } else if (~team.indexOf('rizz')) {
      return 'MEM'
    } else if (~team.indexOf('azz')) {
      return 'UTA'
    } else if (~team.indexOf('ockets')) {
      return 'HOU'
    } else if (~team.indexOf('hunder')) {
      return 'OKC'
    } else if (~team.indexOf('lippers')) {
      return 'LAC'
    } else if (~team.indexOf('akers')) {
      return 'LAL'
    } else if (~team.indexOf('elicans')) {
      return 'NOP'
    } else if (~team.indexOf('istons')) {
      return 'DET'
    } else if (~team.indexOf('ornets')) {
      return 'CHA'
    } else if (~team.indexOf('olves')) {
      return 'MIN'
    } else if (~team.indexOf('nicks')) {
      return 'NYK'
    } else if (~team.indexOf('avericks')) {
      return 'DAL'
    } else if (~team.indexOf('izards')) {
      return 'WSH'
    } else if (~team.indexOf('ulls')) {
      return 'CHI'
    } else if (~team.indexOf('avaliers')) {
      return 'CLE'
    } else if (~team.indexOf('awks')) {
      return 'ATL'
    } else if (~team.indexOf('ings')) {
      return 'SAC'
    } else if (~team.indexOf('agic')) {
      return 'ORL'
    } else if (~team.indexOf('eat')) {
      return 'MIA'
    } else if (~team.indexOf('ets')) {
      return 'BKN'
    } else if (~team.indexOf('uns')) {
      return 'PHX'
    }
    return ''
  }
}
