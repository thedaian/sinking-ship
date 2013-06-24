var Maps = {
	tiles: {
		//water
		"w": {
			blocksMovement: 1,
			blocksLight: 1,
			_char: "▒",
			color: [0, 0, 128],
			colorVariation: [0, 0, 32]
		},
		//ship hull
		"H": {
			blocksMovement: 1,
			blocksLight: 1,
			_char: "█",
			color: [255, 255, 255],
			//colorVariation: [0,16,16]
		},
		//interior wall
		"b": {
			blocksMovement: 1,
			blocksLight: 1,
			_char: "█",
			color: [128, 128, 128],
			//colorVariation: [0,8,8]
		},		
		//interior floor
		".": {
			blocksMovement: 0,
			blocksLight: 0,
			_char: ".",
			color: [128, 128, 128]
		},		
		//interior door
		"+": {
			blocksMovement: 0,
			blocksLight: 1,
			_char: "≡",
			color: [128, 128, 64],
			colorVariation: [16, 16, 0]
		},		
		//stairs going up
		"u": {
			blocksMovement: 0,
			blocksLight: 0,
			_char: "▲",
			color: [128, 255, 128]
		},		
		//stairs going down
		"d": {
			blocksMovement: 0,
			blocksLight: 0,
			_char: "▼",
			color: [255, 128, 128]
		}
	},
	"deck1": [
		"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
		"wHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHwwwwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...Hwwwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bHwwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bbHwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bbbHww",
		"wHb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbbbbHw",
		"wH.................................................................u.Hw",
		"wH.................................................................d.Hw",
		"wHb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbb+bbbbbHw",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bbbHww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bbHwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...bHwwww",
		"wH...b...b...b...b...b...b...b...b...b...b...b...b...b...b...b...Hwwwww",
		"wHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHwwwwww",
		"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww"
	]
};