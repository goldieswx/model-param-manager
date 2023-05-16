

export const dataMock: any = {
    "common": {
      "shaftrack": {"displayBFShapeNames": true, "unitsRounding": {"default": "1.0-2", "kg/tHM": "1.0-0"}},
      "defaultLanguage": "en_GB",
      "alarmsTimeOut": 20,
      "advancedMode": false,
      "useChargingProgramBuffer": false,
      "chargingProgramBufferNumber": 15,
      "useClosedLoop": true,
      "closedLoopBufferNumber": 15,
      "closedLoopApiPort": "http://100.98.8.200:5050/",
      "useFavorites": false,
      "favoritesBufferNumber": 5,
      "recipeBufferNumber": 5,
      "numberChargingProgramRecipes": 40,
      "numberRecipesTemplate": 15,
      "throatSurface": 75.42963961269095,
      "useSkip": true,
      "useSkipTwoSides": false,
      "useConvoyerBelt": false,
      "openRecipeWeightWetOrDry": "dry",
      "skipParameters": {
        "side0": "skip1",
        "side1": "skip1",
        "side2": "skip2",
        "side3": "skip1",
        "ManualSelectSide": true,
        "allowSkipTwoSide": true,
        "maxSkipPerBatch": 4,
        "defaultSkipCount": 2,
        "imperial": {
          "maxVolumeSkip": 18,
          "maxVolumeSkipLeft": 15,
          "maxVolumeSkipRight": 18,
          "maxWeightSkip": 999,
          "maxWeightSkipLeft": 999,
          "maxWeightSkipRight": 999
        },
        "metric": {
          "maxVolumeSkip": 18,
          "maxVolumeSkipLeft": 15,
          "maxVolumeSkipRight": 18,
          "maxWeightSkip": 999,
          "maxWeightSkipLeft": 999,
          "maxWeightSkipRight": 999
        }
      },
      "convoyerBeltParameters": {"imperial": {"maxCapacity": 7000}, "metric": {"maxCapacity": 7000}, "maxSection": 11},
      "burdenConfig": {
        "ManualTotalCokeRate": true,
        "In_Config_Max_Slag_Al2O3": 13,
        "In_Config_Delta_Basicity_2": 0,
        "In_Config_Target_Basicity_2": 0,
        "In_Config_Delta_Basicity_3": 0,
        "In_Config_Target_Basicity_3": 0,
        "In_Config_Delta_Basicity_4": 0,
        "In_Config_Target_Basicity_4": 0,
        "In_Config_Check_All_Basicity_Index": true,
        "In_Config_Lower_Limit_FE": 0,
        "In_Config_Upper_Limit_FE": 3000,
        "In_Config_Min_Correction_MgO": 10
      },
      "compositionConfig": {
        "maxMaterialsBySkipByBatch": 10,
        "maxBatchByRecipe": 4,
        "displayAllMaterialsSides": true,
        "useCompositionCustomColumnOption": true,
        "compositionByWeight": true,
        "useHopperNumber": false,
        "cycleDefinition": ["C", "O", "MIX"],
        "numberHopper": 2,
        "options": {
          "dryWeightReference": false,
          "wetWeightReference": true,
          "showDryWeightOption": true,
          "useDryWeightOption": true,
          "showWetWeightOption": true,
          "useWetWeightOption": true,
          "showBatchThicknessOption": true,
          "useBatchThicknessOption": false,
          "showSkipSideOption": true,
          "useSkipSideOption": true,
          "showMaterialSideOption": false,
          "useMaterialSideOption": false,
          "showOptionColumn": true,
          "useOptionColumn": true,
          "hidePercentColumn": true
        },
        "defaultChargesPerCycle": 1,
        "selectChargesPerCycle": true,
        "imperial": {
          "in_WH_Additive_MaxVolume_Left": 999,
          "in_WH_Additive_MaxWeight_Left": 999,
          "in_WH_Additive_MaxVolume_Right": 999,
          "in_WH_Additive_MaxWeight_Right": 999,
          "in_WH_Ore_MaxVolume_Left": 999,
          "in_WH_Ore_MaxWeight_Left": 999,
          "in_WH_Ore_MaxVolume_Right": 999,
          "in_WH_Ore_MaxWeight_Right": 999,
          "in_WH_Coke_MaxVolume_Left": 999,
          "in_WH_Coke_MaxWeight_Left": 999,
          "in_WH_Coke_MaxVolume_Right": 999,
          "in_WH_Coke_MaxWeight_Right": 999,
          "volumeMaxHopper": 70,
          "weightMaxHopper": 999
        },
        "metric": {
          "in_WH_Additive_MaxVolume_Left": 999,
          "in_WH_Additive_MaxWeight_Left": 999,
          "in_WH_Additive_MaxVolume_Right": 999,
          "in_WH_Additive_MaxWeight_Right": 999,
          "in_WH_Ore_MaxVolume_Left": 999,
          "in_WH_Ore_MaxWeight_Left": 999,
          "in_WH_Ore_MaxVolume_Right": 999,
          "in_WH_Ore_MaxWeight_Right": 999,
          "in_WH_Coke_MaxVolume_Left": 999,
          "in_WH_Coke_MaxWeight_Left": 999,
          "in_WH_Coke_MaxVolume_Right": 999,
          "in_WH_Coke_MaxWeight_Right": 999,
          "volumeMaxHopper": 70,
          "weightMaxHopper": 999
        },
        "In_Config_Show_LayingOption": true,
        "In_Config_CheckWeighingHopperOverfill": false,
        "In_ConfigCheckBurdenMix": true
      },
      "chargingParameters": {
        "options": {
          "distribution": {"values": ["spiral", "ring", "sector"], "default": "spiral"},
          "distributionType": {"values": ["revolution", "percentage"], "default": "revolution"},
          "showDryWeightOption": true,
          "useDryWeightOption": true,
          "showWetWeightOption": true,
          "useWetWeightOption": false,
          "showStartAngle": true,
          "useStartAngle": true,
          "showLevelOption": true,
          "useLevelOption": true,
          "showMaterialGateOption": true,
          "useMaterialGateOption": true,
          "disableMatrixDirection": true
        },
        "advancedCallingLevel": true,
        "sensors": ["generic-1"],
        "orderRingsByDescending": true,
        "centerRingNumber": 1,
        "maxRings": 11,
        "showFlow": true,
        "showSpeed": true,
        "showTime": true,
        "rotationPerMinute": [{"parameterKey": "Parameter_Chute_RPM", "description": "Chute_RPM", "value": 8}],
        "cokeRotationPerMinute": 8,
        "oreRotationPerMinute": 8,
        "useCenterCoke": false,
        "imperial": {
          "flowRateMinOre1": 0.2,
          "flowRateMaxOre1": 0.9,
          "flowRateMinOre2": 0.2,
          "flowRateMaxOre2": 0.9,
          "flowRateMinCoke": 0.2,
          "flowRateMaxCoke": 0.7
        },
        "metric": {
          "flowRateMinOre1": 0.2,
          "flowRateMaxOre1": 0.9,
          "flowRateMinOre2": 0.2,
          "flowRateMaxOre2": 0.9,
          "flowRateMinCoke": 0.2,
          "flowRateMaxCoke": 0.7
        }
      },
      "defaultLevelOne": {
        "defaultCokeFlow": 0.3,
        "defaultOreFlow": 0.3,
        "defaultCokeRpm": 8,
        "defaultOreRpm": 8,
        "defaultCokeTime": 60,
        "defaultOreTime": 60,
        "defaultModeFlow": true,
        "defaultModeTime": true
      },
      "columnOrder": {
        "burdeningsColumnOrder": {
          "editable": ["density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o", "mn", "mno", "ti", "tio2"],
          "calculated": ["calculatedPercent", "b2", "b3", "b4"],
          "laboratory": ["density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o", "mn", "mno", "ti", "tio2"],
          "position": {
            "basis": ["type", "family", "specie", "mode", "calculatedPercent", "percent", "correction", "rate", "dryWeight", "wetWeight", "b3", "density"],
            "analysis": ["type", "b3", "density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o", "mn", "mno", "ti", "tio2"],
            "basisAddNb": 2
          }
        },
        "reducingsColumnOrder": {
          "editable": ["density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "ashesmn", "ashesmno", "ashestio2", "crr"],
          "calculated": ["b2", "b3", "b4"],
          "laboratory": ["density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "ashesmn", "ashesmno", "ashestio2", "crr"],
          "position": {
            "basis": ["type", "family", "specie", "mode", "rate_kgTHm", "rate_Nm3Thm", "dryWeight", "wetWeight", "b3", "density"],
            "analysis": ["type", "b3", "density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "ashesmn", "ashesmno", "ashestio2", "crr"],
            "basisAddNb": 2
          }
        },
        "lostBurdenColumnOrder": {
          "editable": ["rate_kgTHm", "fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"],
          "calculated": ["rate_kgTHm"],
          "laboratory": ["fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"],
          "position": ["type", "rate_kgTHm", "fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"]
        },
        "hotMetalColumnOrder": {
          "editable": ["c", "ti", "mn", "pb", "zn", "zno", "v", "p", "s", "si"],
          "calculated": ["feRate", "feTarget", "hmOutWeight"],
          "laboratory": ["c", "ti", "mn", "pb", "zn", "zno", "v", "p", "s", "si"],
          "position": ["feRate", "feTarget", "hmOutWeight", "c", "ti", "mn", "pb", "zn", "zno", "v", "p", "s", "si"]
        },
        "slagColumnOrder": {
          "editable": ["feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s"],
          "calculated": ["outRate", "outWeight", "outB2", "outB3", "outB4", "outCao", "outSio2", "outAl2o3", "outMgo"],
          "laboratory": ["feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s", "b2", "b3", "b4", "mgo", "composition"],
          "position": ["outRate", "outWeight", "outB2", "outB3", "outB4", "outCao", "outSio2", "outAl2o3", "outMgo", "feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s", "composition", "b2", "b3", "b4", "mgo"]
        },
        "targetSetpoint": {
          "editable": [],
          "calculated": [],
          "laboratory": [],
          "position": ["targetSetPoint", "slagConstraints", "hotMetalTarget", "pciRate", "blackOilRate", "naturalGas", "injectedResidue", "dustRate", "sludgeRate"]
        }
      },
      "basisReference": {
        "Coke_Thickness_at_Throat": false,
        "Coke_Basis": false,
        "Coke_Basis_Wet": true,
        "Burdening_Materials_Basis": false,
        "Burdening_Materials_Basis_Wet": false,
        "Hot_Metal_Basis": false
      },
      "transportOptions": {
        "Empty": true,
        "Plus": true,
        "Percent_10": false,
        "Percent_20": false,
        "Percent_30": false,
        "Percent_40": false,
        "Percent_50": false,
        "Percent_60": false,
        "Percent_70": false,
        "Percent_80": false,
        "Percent_90": false
      }
    },
    "burdi": {
      "advancedMode": true,
      "useChargingProgramBuffer": true,
      "chargingProgramBufferNumber": 15,
      "useClosedLoop": true,
      "closedLoopBufferNumber": 15,
      "useFavorites": false,
      "favoritesBufferNumber": 5,
      "recipeBufferNumber": 5,
      "numberChargingProgramRecipes": 40,
      "numberRecipesTemplate": 15,
      "skipParameters": {
        "side0": "skip1",
        "side1": "skip1",
        "side2": "skip2",
        "side3": "skip1",
        "ManualSelectSide": true,
        "allowSkipTwoSide": true,
        "maxSkipPerBatch": 4,
        "imperial": {
          "maxVolumeSkip": 18,
          "maxVolumeSkipLeft": 15,
          "maxVolumeSkipRight": 18,
          "maxWeightSkip": 999,
          "maxWeightSkipLeft": 999,
          "maxWeightSkipRight": 999
        },
        "metric": {
          "maxVolumeSkip": 18,
          "maxVolumeSkipLeft": 15,
          "maxVolumeSkipRight": 18,
          "maxWeightSkip": 999,
          "maxWeightSkipLeft": 999,
          "maxWeightSkipRight": 999
        }
      },
      "convoyerBeltParameters": {"imperial": {"maxCapacity": 7000}, "metric": {"maxCapacity": 7000}, "maxSection": 11},
      "burdenConfig": {
        "ManualTotalCokeRate": true,
        "In_Config_Max_Slag_Al2O3": 13,
        "In_Config_Delta_Basicity_2": -999999,
        "In_Config_Target_Basicity_2": -999999,
        "In_Config_Delta_Basicity_3": -999999,
        "In_Config_Target_Basicity_3": -999999,
        "In_Config_Delta_Basicity_4": -999999,
        "In_Config_Target_Basicity_4": -999999,
        "In_Config_Check_All_Basicity_Index": true,
        "In_Config_Lower_Limit_FE": 0,
        "In_Config_Upper_Limit_FE": 3000
      },
      "compositionConfig": {
        "maxMaterialsBySkipByBatch": 10,
        "maxBatchByRecipe": 4,
        "displayAllMaterialsSides": true,
        "useCompositionCustomColumnOption": true,
        "compositionByWeight": true,
        "useHopperNumber": false,
        "cycleDefinition": ["C", "O", "MIX"],
        "numberHopper": 2,
        "options": {
          "dryWeightReference": false,
          "wetWeightReference": true,
          "showDryWeightOption": true,
          "useDryWeightOption": true,
          "showWetWeightOption": true,
          "useWetWeightOption": true,
          "showBatchThicknessOption": true,
          "useBatchThicknessOption": false,
          "showSkipSideOption": true,
          "useSkipSideOption": true,
          "showOptionColumn": true,
          "useOptionColumn": true
        },
        "defaultChargesPerCycle": 1,
        "selectChargesPerCycle": true,
        "imperial": {
          "in_WH_Additive_MaxVolume_Left": 999,
          "in_WH_Additive_MaxWeight_Left": 999,
          "in_WH_Additive_MaxVolume_Right": 999,
          "in_WH_Additive_MaxWeight_Right": 999,
          "in_WH_Ore_MaxVolume_Left": 999,
          "in_WH_Ore_MaxWeight_Left": 999,
          "in_WH_Ore_MaxVolume_Right": 999,
          "in_WH_Ore_MaxWeight_Right": 999,
          "in_WH_Coke_MaxVolume_Left": 999,
          "in_WH_Coke_MaxWeight_Left": 999,
          "in_WH_Coke_MaxVolume_Right": 999,
          "in_WH_Coke_MaxWeight_Right": 999,
          "volumeMaxHopper": 70,
          "weightMaxHopper": 999
        },
        "metric": {
          "in_WH_Additive_MaxVolume_Left": 999,
          "in_WH_Additive_MaxWeight_Left": 999,
          "in_WH_Additive_MaxVolume_Right": 999,
          "in_WH_Additive_MaxWeight_Right": 999,
          "in_WH_Ore_MaxVolume_Left": 999,
          "in_WH_Ore_MaxWeight_Left": 999,
          "in_WH_Ore_MaxVolume_Right": 999,
          "in_WH_Ore_MaxWeight_Right": 999,
          "in_WH_Coke_MaxVolume_Left": 999,
          "in_WH_Coke_MaxWeight_Left": 999,
          "in_WH_Coke_MaxVolume_Right": 999,
          "in_WH_Coke_MaxWeight_Right": 999,
          "volumeMaxHopper": 70,
          "weightMaxHopper": 999
        },
        "In_Config_Show_LayingOption": true,
        "In_Config_CheckWeighingHopperOverfill": false,
        "In_ConfigCheckBurdenMix": true
      },
      "chargingParameters": {
        "distribution": ["spiral"],
        "distributionType": ["revolution", "percentage"],
        "showStartAngle": false,
        "advancedCallingLevel": true,
        "radarNumber": 4,
        "orderRingsByDescending": true,
        "centerRingNumber": true,
        "maxRings": 11,
        "showFlow": true,
        "showSpeed": true,
        "showTime": true,
        "showRingOption": true,
        "showSectorOption": true,
        "showSpiralOption": true,
        "rotationPerMinute": [{"parameterKey": "Parameter_Chute_RPM", "description": "Chute_RPM", "value": 8}],
        "imperial": {
          "flowRateMinOre1": 0.2,
          "flowRateMaxOre1": 0.9,
          "flowRateMinOre2": 0.2,
          "flowRateMaxOre2": 0.9,
          "flowRateMinCoke": 0.2,
          "flowRateMaxCoke": 0.7
        },
        "metric": {
          "flowRateMinOre1": 0.2,
          "flowRateMaxOre1": 0.9,
          "flowRateMinOre2": 0.2,
          "flowRateMaxOre2": 0.9,
          "flowRateMinCoke": 0.2,
          "flowRateMaxCoke": 0.7
        }
      },
      "closedLoop": {"Buffer": {"recipesNumber": 3}},
      "defaultLevelOne": {
        "defaultCokeFlow": 0.3,
        "defaultOreFlow": 0.3,
        "defaultCokeRpm": 8,
        "defaultOreRpm": 8,
        "defaultCokeTime": 60,
        "defaultOreTime": 60,
        "defaultModeFlow": true,
        "defaultModeTime": true
      },
      "columnOrder": {
        "burdeningsColumnOrder": {
          "editable": ["density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o"],
          "calculated": ["calculatedPercent", "b2", "b3", "b4"],
          "laboratory": ["density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o"],
          "position": {
            "basis": ["type", "family", "specie", "mode", "calculatedPercent", "percent", "correction", "rate", "dryWeight", "wetWeight", "selectedBasicity", "density"],
            "analysis": ["type", "selectedBasicity", "density", "fe", "s", "zn", "zno", "h2o", "cao", "sio2", "si", "al2o3", "mgo", "k2o", "na2o"],
            "basisAddNb": 2
          }
        },
        "reducingsColumnOrder": {
          "editable": ["density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "crr"],
          "calculated": ["b2", "b3", "b4"],
          "laboratory": ["density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "crr"],
          "position": {
            "basis": ["type", "family", "specie", "mode", "rate_kgTHm", "rate_Nm3Thm", "dryWeight", "wetWeight", "selectedBasicity", "density"],
            "analysis": ["type", "selectedBasicity", "density", "s", "h2o", "ashes", "ashesfe", "ashescao", "ashessio2", "ashesal2o3", "ashesmgo", "ashesk2o", "ashesna2o", "asheszn", "asheszno", "crr"],
            "basisAddNb": 2
          }
        },
        "lostBurdenColumnOrder": {
          "editable": ["rate_kgTHm", "fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"],
          "calculated": ["rate_kgTHm"],
          "laboratory": ["fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"],
          "position": ["type", "rate_kgTHm", "fe", "h2o", "c", "cao", "sio2", "al2o3", "mgo", "k2o"]
        },
        "hotMetalColumnOrder": {
          "editable": ["c", "ti", "mn", "pb", "zn", "zno", "v", "p", "s", "si"],
          "calculated": ["feRate", "feTarget", "hmOutWeight"],
          "laboratory": ["c", "ti", "mn", "pb", "zn", "znO", "v", "p", "s", "si"],
          "position": ["feRate", "feTarget", "hmOutWeight", "c", "ti", "mn", "pb", "zn", "znO", "v", "p", "s", "si"]
        },
        "slagColumnOrder": {
          "editable": ["feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s"],
          "calculated": ["outRate", "outWeight", "outB2", "outB3", "outB4", "outCao", "outSio2", "outAl2o3", "outMgo"],
          "laboratory": ["feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s", "b2", "b3", "b4", "mgo", "composition"],
          "position": ["outRate", "outWeight", "outB2", "outB3", "outB4", "outCao", "outSio2", "outAl2o3", "outMgo", "feo", "na2o", "k2o", "tio2", "mno", "pbo", "zno", "v2o5", "p", "s", "composition", "b2", "b3", "b4", "mgo"]
        },
        "targetSetpoint": {
          "editable": [],
          "calculated": [],
          "laboratory": [],
          "position": ["targetSetPoint", "slagConstraints", "hotMetalTarget", "pciRate", "blackOilRate", "naturalGas", "injectedResidue", "dustRate", "sludgeRate"]
        }
      },
      "basisReference": {
        "Coke_Thickness_at_Throat": false,
        "Coke_Basis": false,
        "Coke_Basis_Wet": true,
        "Burdening_Materials_Basis": false,
        "Hot_Metal_Basis": false,
        "Burden_Calculation": false
      },
      "transportOptions": {
        "Empty": true,
        "Plus": true,
        "Percent_10": false,
        "Percent_20": false,
        "Percent_30": false,
        "Percent_40": false,
        "Percent_50": false,
        "Percent_60": false,
        "Percent_70": false,
        "Percent_80": false,
        "Percent_90": false
      }
    },
    "closedloop": {"maxCount": 5},
    "closedloopbuilder": null,
    "hlm": null,
    "shaftrack": {
      "displayBFShapeNames": true,
      "MAX_SECTIONS": 9,
      "MAX_RINGS": 11,
      "WEIGHT_MODE": 2,
      "WEIGHT_UNIT": "t",
      "DISPLAY_SACHEM_INFOS": true,
      "CharginModelSvgUrl": "",
      "TimeLineStartDate": 7,
      "OlmbResultType": 1,
      "unitsRounding": {"default": "1.0-2", "kg/tHM": "1.0-0"}
    }
  }
