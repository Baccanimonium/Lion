export default (value) => typeof !isFinite(value) && !isNaN(value) ? value : 'n/a'

