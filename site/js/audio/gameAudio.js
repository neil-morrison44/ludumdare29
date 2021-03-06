site.audio = site.audio || {};

site.audio.gameAudio = (function() {
	var context = new AudioContext();
	var laser = ["sine", 0.0000, 0.4000, 0.0000, 0.2200, 0.0000, 0.3220, 110.0000, 758.0000, 2400.0000, -0.9480, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.5000, -0.1560, 0.0000, 0.0000, 0.0000, 1.0000, 0.0000, 0.0000, 0.0340, 0.0000];
	var horror = ["square", 0.0000, 0.4000, 0.2250, 1.4420, 0.3750, 1.6700, 1660.0000, 214.0000, 834.0000, 0.9500, 0.6100, 0.7100, 43.1050, -0.2116, 0.7660, -0.2920, 0.6810, 0.0185, 0.2920, 0.4072, 0.3160, 0.8220, 0.3620, 0.4120, 0.6930, 0.7890, 0.2720];
	var wave = ["noise", 0.0000, 0.3640, 0.9000, 0.6060, 0.0000, 0.6020, 20.0000, 808.0000, 2012.0000, 0.4040, 0.2020, 0.2820, 0.0100, 0.0003, 0.0000, 0.0000, 0.2660, 0.0000, 0.0000, 0.2048, 0.0020, 0.0000, 0.9880, 0.0000, 0.2050, 0.8740, 0.4360];
	var thruster = ["noise", 0.0000, 0.3700, 0.0000, 0.2780, 0.0000, 0.1940, 20.0000, 488.0000, 2400.0000, 0.2900, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.4000, 0.0000, 0.0000, 0.0000, 0.0000, 0.9680, 0.0000, 0.0000, 0.0050, 0.0000];
	var miniThruster = ["noise", 0.0000, 0.2700, 0.0000, 0.2780, 0.0000, 0.1940, 20.0000, 488.0000, 2400.0000, 0.2900, 0.0000, 0.0000, 0.0100, 0.0003, 0.0000, 0.0000, 0.0000, 0.4000, 0.0000, 0.0000, 0.0000, 0.0000, 0.9680, 0.0000, 0.0000, 0.0050, 0.0000];

	var hit = ["noise", 0.0000, 0.6000, 0.0000, 0.2060, 0.4980, 0.1360, 159.0000, 952.0000, 1485.0000, 0.2120, 0.0000, 0.1770, 0.0100, 0.0003, 0.0000, 1.0000, 0.2590, 0.3755, 0.5020, 0.0000, -0.3000, -0.2300, 0.9840, 0.5660, 0.0000, 0.0000, 0.0000];

	var startUp = ["sine",0.0000,0.8000,0.8090,1.4300,2.9340,0.5400,1013.0000,1516.0000,536.0000,-0.3800,-0.4220,0.4230,31.3955,0.8973,0.4600,0.6300,0.8880,0.3540,0.9440,0.7984,0.7200,0.5220,0.6470,-0.2540,0.7510,0.6130,-0.3340];

	var monsterSound = ["sine",0.0000,1.0000,0.8090,1.4300,2.9340,1.1320,1013.0000,397.0000,608.0000,-0.3480,-0.4220,0.1630,31.3955,0.8973,0.4600,0.6300,0.8880,0.3540,0.9440,0.8000,0.7200,0.5220,1.0000,-0.2540,0.7510,0.6130,-0.3340];

	var splash = ["noise",0.0000,0.1700,0.0000,0.4060,0.4050,1.1880,20.0000,2078.0000,2400.0000,0.1420,0.4600,0.0000,0.0100,0.0003,0.0000,0.8460,0.3940,0.0000,0.0000,0.0000,-0.0020,0.0000,0.9910,0.0000,0.7550,0.0000,0.0000];

	var hurt = ["noise",0.0000,0.5060,0.0210,0.1640,0.6420,0.7920,20.0000,2400.0000,2400.0000,-0.5000,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.0000,0.9980,-0.9720,0.9440,0.7230,-1.0000];
	var land = ["synth",0.0000,1.0000,0.0000,0.1920,3.0000,0.0980,1124.0000,137.0000,2023.0000,-0.6220,-0.1720,0.6170,23.1892,-0.1674,0.7000,-0.3900,0.1500,0.0700,0.7720,0.1824,0.6460,-0.0460,0.1890,0.3380,0.5760,0.7970,-0.1880];

	var bossHit = ["synth",0.0000,0.8000,0.0630,0.3820,1.2240,0.2200,1202.0000,497.0000,370.0000,-0.4840,-0.2720,0.6270,37.9701,0.3110,-0.1840,-0.5460,0.1090,0.3030,-0.1320,0.7736,-0.7780,0.8500,0.9670,-0.8260,0.8710,0.5780,-0.4400];

	var enemyKill = ["synth",0.0000,0.1210,0.0630,0.3820,1.2240,0.2200,1202.0000,2178.0000,370.0000,-0.4840,-0.2720,0.6270,47.9520,-0.3000,1.0000,-0.3840,0.1680,0.3030,-0.1320,0.7736,-0.7780,0.8500,0.9880,-0.7800,0.9230,0.9390,-0.4400];


	var message = ["sine",0.0000,0.0540,0.0280,0.0000,0.0000,0.8860,408.0000,2400.0000,2400.0000,-0.6300,-0.7520,0.0000,0.0100,-0.3000,-1.0000,-0.7300,0.1350,0.1660,0.4080,0.8000,1.0000,-1.0000,1.0000,-1.0000,1.0000,1.0000,1.0000];
	var lastSound = (new Date()).getTime();

	function play(sound) {

		var buffer = WebAudiox.getBufferFromJsfx(context, sound);

		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);

		source.start(0);
	}
	return {
		laserSound: function() {

			play(laser);
		},
		waveSound: function() {
			play(wave);
		},
		thrusterSound: function() {

			var now = (new Date).getTime();

			if (now < lastSound + 50) {
				return;
			}

			lastSound = now;

			play(thruster);
		},
		hitSound: function() {
			play(hit);
		},
		miniThrusterSound: function() {
			play(miniThruster);
		},
		startUpSound: function(){
			play(startUp);
		},
		splashSound:function(){
			play(splash);
		},
		landSound:function(){
			play(land);
		},
		hurtSound:function(){
			play(hurt);
		},
		enemyKillSound:function(){
			play(enemyKill);
		},
		messageSound:function(){
			play(message);
		},
		bossHitSound:function(){
			play(bossHit);
		},
		monsterSound:function(){
			play(monsterSound);
		}
	}
}());