System.register("chunks:///_virtual/SwingBone2D.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './VRMSpringBoneLogic2D.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, SphereCollider, Vec3, Component, VRMSpringBoneLogic2D;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      SphereCollider = module.SphereCollider;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      VRMSpringBoneLogic2D = module.VRMSpringBoneLogic2D;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

      cclegacy._RF.push({}, "17f3blvZyJG17w8XD99xkkh", "SwingBone2D", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SwingBone2D = exports('SwingBone2D', (_dec = property([Node]), _dec2 = property([SphereCollider]), _dec3 = property(Node), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SwingBone2D, _Component);

        function SwingBone2D() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "m_comment", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "RootBones", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "colliderGroups", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_stiffnessForce", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_gravityPower", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_gravityDir", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_dragForce", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_center", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_hitRadius", _descriptor9, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "m_initialLocalRotationMap", new Map());

          _defineProperty(_assertThisInitialized(_this), "m_verlet", []);

          _defineProperty(_assertThisInitialized(_this), "m_colliderList", []);

          return _this;
        }

        var _proto = SwingBone2D.prototype;

        _proto.start = function start() {
          this.setup();
        };

        _proto.setup = function setup(force) {
          if (force === void 0) {
            force = false;
          } // console.log("setup");


          if (this.RootBones != null) {
            if (force || this.m_initialLocalRotationMap == null) {
              this.m_initialLocalRotationMap = new Map();
            } else {
              for (var _iterator = _createForOfIteratorHelperLoose(this.m_initialLocalRotationMap), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                    key = _step$value[0],
                    value = _step$value[1];
                key.rotation = value;
              }

              this.m_initialLocalRotationMap.clear();
            }

            this.m_verlet.length = 0;

            for (var _iterator2 = _createForOfIteratorHelperLoose(this.RootBones), _step2; !(_step2 = _iterator2()).done;) {
              var go = _step2.value;

              if (go != null) {
                // for (var x in go.transform.Traverse()) {
                //     this.m_initialLocalRotationMap[x] = x.localRotation;
                // }
                this.m_initialLocalRotationMap.set(go, go.rotation);
                this.SetupRecursive(this.m_center, go);
              }
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(this.colliderGroups), _step3; !(_step3 = _iterator3()).done;) {
              var collider = _step3.value;

              if (collider !== null) {
                this.m_colliderList.push(collider);
              }
            }
          }
        } // static IEnumerable<Transform> GetChildren(Transform parent)
        // {
        //     for(int i=0; i<parent.childCount; ++i)
        //     {
        //         yield return parent.GetChild(i);
        //     }
        // }
        ;

        _proto.SetupRecursive = function SetupRecursive(center, parent) {
          var _this2 = this;

          if (parent.children.length == 0) {
            if (!parent.parent) {
              return;
            }

            var delta = parent.getWorldPosition().clone().subtract(parent.parent.getWorldPosition());
            var childPosition = parent.getWorldPosition().clone().add(delta.normalize().multiplyScalar(100));
            var matrix = parent.getWorldMatrix().invert();
            var localChildPosition = childPosition.clone().transformMat4(matrix);
            var com = new VRMSpringBoneLogic2D(center, parent, localChildPosition);
            this.m_verlet.push(com);
          } else {
            var firstChild = parent.children[0];
            var localPosition = firstChild.position;
            var scale = firstChild.scale;

            var _com = new VRMSpringBoneLogic2D(center, parent, new Vec3(localPosition.x * scale.x, localPosition.y * scale.y, localPosition.z * scale.z)); // let com = new VRMSpringBoneLogic2D(center, parent, localPosition);


            this.m_verlet.push(_com);
          }

          parent.children.forEach(function (child) {
            _this2.SetupRecursive(center, child);
          });
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          var _this3 = this; // console.log("lateUpdate");


          if (this.m_verlet == null || this.m_verlet.length == 0) {
            if (this.RootBones == null) {
              return;
            }

            this.setup();
          } // m_colliderList.Clear();
          // if (ColliderGroups != null) {
          //     foreach(var group in ColliderGroups)
          //     {
          //         if (group != null) {
          //             foreach(var collider in group.Colliders)
          //             {
          //                 m_colliderList.Add(new SphereCollider
          //                     {
          //                         Position = group.transform.TransformPoint(collider.Offset),
          //                         Radius = collider.Radius,
          //                     });
          //             }
          //         }
          //     }
          // }


          var stiffness = this.m_stiffnessForce * dt;
          var external = this.m_gravityDir.clone().multiplyScalar(this.m_gravityPower * dt);
          this.m_verlet.forEach(function (verlet) {
            verlet.radius = _this3.m_hitRadius;
            verlet.Update(_this3.m_center, stiffness, _this3.m_dragForce, external, _this3.m_colliderList);
          });
        };

        return SwingBone2D;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_comment", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "RootBones", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colliderGroups", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "m_stiffnessForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 5.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "m_gravityPower", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "m_gravityDir", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, -1, 0);
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "m_dragForce", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.4;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "m_center", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "m_hitRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.02;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Footer.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './TutorialManger.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Button, Node, director, Component, TutorialManger;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      TutorialManger = module.TutorialManger;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "20635PHXmRCd7iKDE1IIquH", "Footer", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Footer = exports('Footer', (_dec = property(Button), _dec2 = property(Button), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Footer, _Component);

        function Footer() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnPrev", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnNext", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "pageIndex", void 0);

          return _this;
        }

        var _proto = Footer.prototype;

        _proto.setup = function setup(pageIndex) {
          this.btnPrev.node.on(Node.EventType.TOUCH_END, this.onTapPrev, this);
          this.btnNext.node.on(Node.EventType.TOUCH_END, this.onTapNext, this);
          this.pageIndex = pageIndex;

          if (pageIndex == 1) {
            this.btnPrev.node.active = false;
          }

          if (pageIndex == TutorialManger.totalPages) {
            this.btnNext.node.active = false;
          }
        };

        _proto.onTapPrev = function onTapPrev() {
          console.log("onTapPrev");
          if (!this.pageIndex || this.pageIndex <= 1) return;
          var sceneName = "tutorial-" + (this.pageIndex - 1);
          director.loadScene(sceneName);
        };

        _proto.onTapNext = function onTapNext() {
          console.log("onTapNext");
          if (this.pageIndex >= TutorialManger.totalPages) return;
          var sceneName = "tutorial-" + (this.pageIndex + 1);
          director.loadScene(sceneName);
        };

        _proto.onDestroy = function onDestroy() {// this.btnPrev.node.off(Node.EventType.TOUCH_END, this.onTapPrev, this);
          // this.btnNext.node.off(Node.EventType.TOUCH_END, this.onTapNext, this);
        };

        return Footer;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnPrev", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "btnNext", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DemoScene.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Button, Node, tween, Vec3, easing, director, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      tween = module.tween;
      Vec3 = module.Vec3;
      easing = module.easing;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "26b1c6B8shFgpoXdvSSqZlM", "DemoScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DemoScene = exports('DemoScene', (_dec = property(Button), _dec2 = property(Node), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DemoScene, _Component);

        function DemoScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "btnNext", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "handNode", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DemoScene.prototype;

        _proto.onLoad = function onLoad() {
          this.btnNext.node.on(Node.EventType.TOUCH_END, this.onTapNext, this);
        };

        _proto.start = function start() {
          // this.handNode
          tween(this.handNode).sequence(tween().by(2, {
            position: new Vec3(200, 0, 0)
          }, {
            easing: easing.sineInOut
          }), tween().by(2, {
            position: new Vec3(-200, 0, 0)
          }, {
            easing: easing.sineInOut
          })).repeatForever().start();
        };

        _proto.onTapNext = function onTapNext() {
          var sceneName = "tutorial-1";
          director.loadScene(sceneName);
        };

        return DemoScene;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "btnNext", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TutorialManger.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _class, _class2, _temp;

      cclegacy._RF.push({}, "36c49eSDixAV7+QNnWQz8jn", "TutorialManger", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TutorialManger = exports('TutorialManger', ccclass(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TutorialManger, _Component);

        function TutorialManger() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TutorialManger.prototype;

        _proto.init = function init() {};

        return TutorialManger;
      }(Component), _defineProperty(_class2, "totalPages", 5), _temp)) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwingBoneToggle.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './SwingBone.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Toggle, Label, Component, SwingBone;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Toggle = module.Toggle;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      SwingBone = module.SwingBone;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "4a8ab2Xwx9IEa2eOiIY9V2e", "SwingBoneToggle", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SwingBoneToggle = exports('SwingBoneToggle', (_dec = property(Toggle), _dec2 = property(Label), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SwingBoneToggle, _Component);

        function SwingBoneToggle() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "toggle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = SwingBoneToggle.prototype;

        _proto.onLoad = function onLoad() {
          console.log(this);
          this.toggle.isChecked = SwingBone.enabled;
          this.label.string = this.toggle.isChecked ? "Enabled" : "Disabled";
        };

        _proto.onToggle = function onToggle() {
          SwingBone.enabled = this.toggle.isChecked;
          this.label.string = this.toggle.isChecked ? "Enabled" : "Disabled";
        };

        return SwingBoneToggle;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "toggle", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/StiffnessForceSlider.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Slider, Label, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Slider = module.Slider;
      Label = module.Label;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "77626PYEzlH0atIemSbipvi", "StiffnessForceSlider", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StiffnessForceSlider = exports('StiffnessForceSlider', (_dec = property(Slider), _dec2 = property(Label), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StiffnessForceSlider, _Component);

        function StiffnessForceSlider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "slider", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          return _this;
        } // onLoad() {
        //     this.slider.progress = SwingBone.m_stiffnessForce;
        //     this.label.string = "stiffnessForce:" + this.slider.progress.toFixed(2);
        // }
        // onSliderMove() {
        //     SwingBone.m_stiffnessForce = this.slider.progress;
        //     this.label.string = "stiffnessForce:" + this.slider.progress.toFixed(2);
        // }


        return StiffnessForceSlider;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TSKit.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7ada0ufZyJA2pE6i+TYkD/Q", "TSKit", undefined);

      Object.defineProperty(window, 'logFuncName', {
        configurable: true,
        get: function get() {
          return function (target, propertyKey, descriptor) {
            // console.log(params);
            descriptor.value = function () {
              console.log('Excute function:' + propertyKey);
            };

            return descriptor;
          };
        }
      });
      var TSKit = exports('default', {});

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VRMSpringBoneLogic.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, _createClass, _defineProperty, cclegacy, Quat, Mat4, Vec3;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Mat4 = module.Mat4;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ae66eu7/9xBhY3LrivCNvpH", "VRMSpringBoneLogic", undefined); //     Position: Vec3;
      //     Radius: number;
      // }


      var VRMSpringBoneLogic = exports('VRMSpringBoneLogic', /*#__PURE__*/function () {
        function VRMSpringBoneLogic(center, transform, localChildPosition) {
          _defineProperty(this, "m_transform", void 0);

          _defineProperty(this, "m_length", void 0);

          _defineProperty(this, "m_currentTail", new Vec3());

          _defineProperty(this, "m_prevTail", void 0);

          _defineProperty(this, "m_localRotation", void 0);

          _defineProperty(this, "m_boneAxis", void 0);

          _defineProperty(this, "radius", 0); // console.log("swingNode", transform);


          this.m_transform = transform;
          var worldChildPosition = this.m_transform.transformPoint(localChildPosition);
          this.m_currentTail = center != null ? center.inverseTransformPoint(this.m_currentTail, worldChildPosition) : worldChildPosition;
          this.m_prevTail = this.m_currentTail.clone();
          this.m_localRotation = transform.rotation.clone();
          this.m_boneAxis = localChildPosition.clone().normalize();
          this.m_length = localChildPosition.length();
        }

        var _proto = VRMSpringBoneLogic.prototype;

        _proto.Update = function Update(center, stiffnessForce, dragForce, external, colliders) {
          var currentTail = center != null ? center.transformPoint(this.m_currentTail) : this.m_currentTail;
          var prevTail = center != null ? center.transformPoint(this.m_prevTail) : this.m_prevTail;
          var temp1 = currentTail.clone().subtract(prevTail).multiplyScalar(1.0 - dragForce);
          var rotateQuat = new Quat();
          Quat.multiply(rotateQuat, this.ParentRotation, this.m_localRotation);
          var rotateMat = new Mat4();
          Mat4.fromQuat(rotateMat, rotateQuat);
          var temp2 = this.m_boneAxis.clone().transformMat4(rotateMat).multiplyScalar(stiffnessForce);
          var nextTail = currentTail.clone().add(temp1).add(temp2).add(external);
          var temp = nextTail.clone().subtract(this.m_transform.getWorldPosition()).normalize().multiplyScalar(this.m_length);
          nextTail = this.m_transform.getWorldPosition().clone().add(temp);
          nextTail = this.Collision(colliders, nextTail);
          this.m_prevTail = center != null ? center.inverseTransformPoint(this.m_prevTail, currentTail) : currentTail;
          this.m_currentTail = center != null ? center.inverseTransformPoint(this.m_currentTail, nextTail) : nextTail; // nextTail = new Vec3(0, 1.4, 0.662);

          var rotation = this.ApplyRotation(nextTail);
          this.Head.setWorldRotation(rotation);
        };

        _proto.ApplyRotation = function ApplyRotation(nextTail) {
          var rotation = new Quat();
          Quat.multiply(rotation, this.ParentRotation, this.m_localRotation);
          var rotateMat = new Mat4();
          Mat4.fromQuat(rotateMat, rotation);
          var tempQuat = new Quat();
          var fromDirection = this.m_boneAxis.clone().transformMat4(rotateMat);
          var toDirection = nextTail.clone().subtract(this.m_transform.getWorldPosition());
          Quat.rotationTo(tempQuat, fromDirection.normalize(), toDirection.normalize());
          var resultQuat = new Quat();
          Quat.multiply(resultQuat, tempQuat, rotation);
          return resultQuat;
        };

        _proto.Collision = function Collision(colliders, nextTail) {
          for (var _iterator = _createForOfIteratorHelperLoose(colliders), _step; !(_step = _iterator()).done;) {
            var collider = _step.value;
            var r = this.radius + collider.radius;

            if (nextTail.clone().subtract(collider.node.transformPoint(collider.center)).length() <= r) {
              var normal = nextTail.clone().subtract(collider.node.transformPoint(collider.center)).normalize();
              var posFromCollider = collider.node.transformPoint(collider.center).clone().add(normal.multiplyScalar(r));
              var temp = posFromCollider.subtract(this.m_transform.getWorldPosition()).normalize();
              nextTail = this.m_transform.getWorldPosition().clone().add(temp.multiplyScalar(this.m_length));
            }
          }

          return nextTail;
        };

        _createClass(VRMSpringBoneLogic, [{
          key: "Head",
          get: function get() {
            return this.m_transform;
          } // public get Tail() {
          //     // 待验证
          //     // get { return m_transform.localToWorldMatrix.MultiplyPoint(m_boneAxis * m_length); }
          //     // this.m_transform.local
          //     let dir = this.m_boneAxis.clone().multiplyScalar(this.m_length);
          //     let result = this.m_transform.getWorldPosition().clone().add(dir);
          //     let matrix = this.m_transform.getWorldMatrix();
          //     let result2 = dir.clone().transformMat4(matrix);
          //     console.log(result, result2);
          //     return result2
          // }

        }, {
          key: "ParentRotation",
          get: function get() {
            return this.m_transform.parent != null ? this.m_transform.parent.getWorldRotation() : Quat.IDENTITY;
          }
        }]);

        return VRMSpringBoneLogic;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ChainHead.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, instantiate, UITransform, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "ba87bU9W1lKnrzHcZeqUVa4", "ChainHead", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ChainHead = exports('ChainHead', (_dec = property(Node), _dec2 = property(Node), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ChainHead, _Component);

        function ChainHead() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "boneNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "boneContainer", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "boneCount", 5);

          _defineProperty(_assertThisInitialized(_this), "boneLength", 100);

          _defineProperty(_assertThisInitialized(_this), "rootNode", null);

          _defineProperty(_assertThisInitialized(_this), "tailNode", null);

          _defineProperty(_assertThisInitialized(_this), "isMouseDown", false);

          return _this;
        }

        var _proto = ChainHead.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
          this.rootNode = this.node.parent;
          this.tailNode = this.boneContainer; //方便演示用

          if (this.boneContainer.children.length == 0) {
            this.initNodes();
          }
        } // @logFuncName
        ;

        _proto.initNodes = function initNodes() {
          for (var i = 0; i < this.boneCount; i++) {
            var node = instantiate(this.boneNode);
            node.getComponent(UITransform).height = this.boneLength;

            if (i == 0) {
              node.setPosition(new Vec3(0, 0, 0));
            } else {
              node.setPosition(new Vec3(0, -this.boneLength, 0));
            }

            node.active = true;
            this.tailNode.addChild(node);
            this.tailNode = node;
          }
        };

        _proto.start = function start() {};

        _proto.onTouchStart = function onTouchStart(event) {
          this.isMouseDown = true;
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (!this.isMouseDown) return; // console.log("onTouchMove");

          var location = event.getUILocation();
          var pos = new Vec3(location.x, location.y, 0);
          pos = this.rootNode.getComponent(UITransform).convertToNodeSpaceAR(pos);
          this.node.setPosition(pos);
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this.isMouseDown = false; // console.log("onTouchEnd");
        };

        return ChainHead;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "boneNode", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "boneContainer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SwingBone.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './VRMSpringBoneLogic.ts'], function (exports) {
  'use strict';

  var _defineProperty, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Node, setDisplayStats, SphereCollider, Vec3, Component, VRMSpringBoneLogic;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      setDisplayStats = module.setDisplayStats;
      SphereCollider = module.SphereCollider;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      VRMSpringBoneLogic = module.VRMSpringBoneLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

      cclegacy._RF.push({}, "cb240Ay2FRAq5Sce0AwCQBP", "SwingBone", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property; // class Utility {
      //     reverse<T>(items: T[]): T[] {
      //         const toreturn = [];
      //         for (let i = items.length; i >= 0; i--) {
      //             toreturn.push(items[i]);
      //         }
      //         return toreturn;
      //     }
      // }

      var SwingBone = exports('SwingBone', (_dec = property([Node]), _dec2 = property([Node]), _dec3 = property(Node), ccclass(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SwingBone, _Component);

        function SwingBone() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "m_comment", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "RootBones", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "colliderGroups", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_gravityPower", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_gravityDir", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_center", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "m_hitRadius", _descriptor7, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "m_initialLocalRotationMap", new Map());

          _defineProperty(_assertThisInitialized(_this), "m_verlet", []);

          _defineProperty(_assertThisInitialized(_this), "m_colliderList", []);

          return _this;
        }

        var _proto = SwingBone.prototype;

        _proto.start = function start() {
          this.setup();
          setDisplayStats(false);
        };

        _proto.setup = function setup(force) {
          if (force === void 0) {
            force = false;
          } // console.log("setup");


          if (this.RootBones != null) {
            if (force || this.m_initialLocalRotationMap == null) {
              this.m_initialLocalRotationMap = new Map();
            } else {
              for (var _iterator = _createForOfIteratorHelperLoose(this.m_initialLocalRotationMap), _step; !(_step = _iterator()).done;) {
                var _step$value = _step.value,
                    key = _step$value[0],
                    value = _step$value[1];
                key.rotation = value;
              }

              this.m_initialLocalRotationMap.clear();
            }

            this.m_verlet.length = 0;

            for (var _iterator2 = _createForOfIteratorHelperLoose(this.RootBones), _step2; !(_step2 = _iterator2()).done;) {
              var go = _step2.value;

              if (go != null) {
                // for (var x in go.transform.Traverse()) {
                //     this.m_initialLocalRotationMap[x] = x.localRotation;
                // }
                this.m_initialLocalRotationMap.set(go, go.rotation);
                this.SetupRecursive(this.m_center, go);
              }
            }

            for (var _iterator3 = _createForOfIteratorHelperLoose(this.colliderGroups), _step3; !(_step3 = _iterator3()).done;) {
              var collider = _step3.value;

              if (collider !== null) {
                var colliders = collider.getComponents(SphereCollider);
                this.m_colliderList.push.apply(this, colliders);
              }
            }
          }
        } // static IEnumerable<Transform> GetChildren(Transform parent)
        // {
        //     for(int i=0; i<parent.childCount; ++i)
        //     {
        //         yield return parent.GetChild(i);
        //     }
        // }
        ;

        _proto.SetupRecursive = function SetupRecursive(center, parent) {
          var _this2 = this;

          if (parent.children.length == 0) {
            if (!parent.parent) {
              return;
            }

            var delta = parent.getWorldPosition().clone().subtract(parent.parent.getWorldPosition());
            var childPosition = parent.getWorldPosition().clone().add(delta.normalize().multiplyScalar(0.07));
            var matrix = parent.getWorldMatrix().invert();
            var localChildPosition = childPosition.clone().transformMat4(matrix);
            var com = new VRMSpringBoneLogic(center, parent, localChildPosition);
            this.m_verlet.push(com);
          } else {
            var firstChild = parent.children[0];
            var localPosition = firstChild.position;
            var scale = firstChild.scale;

            var _com = new VRMSpringBoneLogic(center, parent, new Vec3(localPosition.x * scale.x, localPosition.y * scale.y, localPosition.z * scale.z)); // let com = new VRMSpringBoneLogic(center, parent, localPosition);


            this.m_verlet.push(_com);
          }

          parent.children.forEach(function (child) {
            _this2.SetupRecursive(center, child);
          });
        };

        _proto.lateUpdate = function lateUpdate(dt) {
          var _this3 = this;

          if (!SwingBone.enabled) return; // console.log("lateUpdate");

          if (this.m_verlet == null || this.m_verlet.length == 0) {
            if (this.RootBones == null) {
              return;
            }

            this.setup();
          } // m_colliderList.Clear();
          // if (ColliderGroups != null) {
          //     foreach(var group in ColliderGroups)
          //     {
          //         if (group != null) {
          //             foreach(var collider in group.Colliders)
          //             {
          //                 m_colliderList.Add(new SphereCollider
          //                     {
          //                         Position = group.transform.TransformPoint(collider.Offset),
          //                         Radius = collider.Radius,
          //                     });
          //             }
          //         }
          //     }
          // }


          var stiffness = SwingBone.m_stiffnessForce * dt;
          var external = this.m_gravityDir.clone().multiplyScalar(this.m_gravityPower * dt);
          this.m_verlet.forEach(function (verlet) {
            verlet.radius = _this3.m_hitRadius;
            verlet.Update(_this3.m_center, stiffness, SwingBone.m_dragForce, external, _this3.m_colliderList);
          });
        };

        return SwingBone;
      }(Component), _defineProperty(_class3, "m_dragForce", 0.8), _defineProperty(_class3, "m_stiffnessForce", 1), _defineProperty(_class3, "enabled", true), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "m_comment", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "RootBones", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "colliderGroups", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "m_gravityPower", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "m_gravityDir", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0, -1, 0);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "m_center", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "m_hitRadius", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.02;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Girl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, tween, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "cc773HYijRBJL+ICWg2ANbo", "Girl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Girl = exports('Girl', (_dec = property(Node), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Girl, _Component);

        function Girl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "model", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Girl.prototype;

        _proto.onLoad = function onLoad() {
          var _this2 = this;

          Object.defineProperty(window, 'girl', {
            get: function get() {
              return _this2;
            },
            configurable: true
          });
        };

        _proto.start = function start() {
          this.playMoveAnimation();
        };

        _proto.playMoveAnimation = function playMoveAnimation() {
          var half = 0.4;
          var y = -this.node.position.y;
          var anim = tween(this.model).sequence(tween(this.node).to(1, {
            position: new Vec3(half, y, 0)
          }, {
            easing: 'sineOut'
          }), tween(this.node).to(1, {
            position: new Vec3(-half, y, 0)
          }, {
            easing: 'sineOut'
          }), tween(this.node).delay(2));
          anim.repeatForever();
          anim.start();
        };

        return Girl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoneColliderGroup.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _class;

      cclegacy._RF.push({}, "cdc9dFSkV1GarFQDlyfaY8y", "BoneColliderGroup", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      /**
       * @en
       * Sphere collider component.
       * @zh
       * 球碰撞器。
       */

      var BoneColliderGroup = exports('BoneColliderGroup', ccclass(_class = executeInEditMode(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BoneColliderGroup, _Component);

        function BoneColliderGroup() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = BoneColliderGroup.prototype; // collider:

        _proto.start = function start() {// physics.
        };

        return BoneColliderGroup;
      }(Component)) || _class) || _class);

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VRMSpringBoneLogic2D.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _createForOfIteratorHelperLoose, _createClass, _defineProperty, cclegacy, Quat, Mat4, Vec3;

  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Quat = module.Quat;
      Mat4 = module.Mat4;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d6ef7pF/TlJSYqDAe4fPiRw", "VRMSpringBoneLogic2D", undefined); //     Position: Vec3;
      //     Radius: number;
      // }


      var VRMSpringBoneLogic2D = exports('VRMSpringBoneLogic2D', /*#__PURE__*/function () {
        function VRMSpringBoneLogic2D(center, transform, localChildPosition) {
          _defineProperty(this, "m_transform", void 0);

          _defineProperty(this, "m_length", void 0);

          _defineProperty(this, "m_currentTail", new Vec3());

          _defineProperty(this, "m_prevTail", void 0);

          _defineProperty(this, "m_localRotation", void 0);

          _defineProperty(this, "m_boneAxis", void 0);

          _defineProperty(this, "radius", 0); // console.log("swingNode", transform);


          this.m_transform = transform;
          var worldChildPosition = this.m_transform.transformPoint(localChildPosition);
          this.m_currentTail = center != null ? center.inverseTransformPoint(this.m_currentTail, worldChildPosition) : worldChildPosition;
          this.m_prevTail = this.m_currentTail.clone();
          this.m_localRotation = transform.rotation.clone();
          this.m_boneAxis = localChildPosition.clone().normalize();
          this.m_length = localChildPosition.length();
        }

        var _proto = VRMSpringBoneLogic2D.prototype;

        _proto.Update = function Update(center, stiffnessForce, dragForce, external, colliders) {
          var currentTail = center != null ? center.transformPoint(this.m_currentTail) : this.m_currentTail;
          var prevTail = center != null ? center.transformPoint(this.m_prevTail) : this.m_prevTail;
          var temp1 = currentTail.clone().subtract(prevTail).multiplyScalar(1.0 - dragForce);
          var rotateQuat = new Quat();
          Quat.multiply(rotateQuat, this.ParentRotation, this.m_localRotation);
          var rotateMat = new Mat4();
          Mat4.fromQuat(rotateMat, rotateQuat);
          var temp2 = this.m_boneAxis.clone().transformMat4(rotateMat).multiplyScalar(stiffnessForce);
          var nextTail = currentTail.clone().add(temp1).add(temp2).add(external);
          var temp = nextTail.clone().subtract(this.m_transform.getWorldPosition()).normalize().multiplyScalar(this.m_length);
          nextTail = this.m_transform.getWorldPosition().clone().add(temp); // nextTail = this.Collision(colliders, nextTail);

          this.m_prevTail = center != null ? center.inverseTransformPoint(this.m_prevTail, currentTail) : currentTail;
          this.m_currentTail = center != null ? center.inverseTransformPoint(this.m_currentTail, nextTail) : nextTail; // nextTail = new Vec3(0, 1.4, 0.662);

          var rotation = this.ApplyRotation(nextTail);
          this.Head.setWorldRotation(rotation);
        };

        _proto.ApplyRotation = function ApplyRotation(nextTail) {
          var rotation = new Quat();
          Quat.multiply(rotation, this.ParentRotation, this.m_localRotation);
          var rotateMat = new Mat4();
          Mat4.fromQuat(rotateMat, rotation);
          var tempQuat = new Quat();
          var fromDirection = this.m_boneAxis.clone().transformMat4(rotateMat);
          var toDirection = nextTail.clone().subtract(this.m_transform.getWorldPosition());
          Quat.rotationTo(tempQuat, fromDirection.normalize(), toDirection.normalize());
          var resultQuat = new Quat();
          Quat.multiply(resultQuat, tempQuat, rotation);
          return resultQuat;
        };

        _proto.Collision = function Collision(colliders, nextTail) {
          for (var _iterator = _createForOfIteratorHelperLoose(colliders), _step; !(_step = _iterator()).done;) {
            var collider = _step.value;
            var r = this.radius + collider.radius;

            if (nextTail.clone().subtract(collider.node.transformPoint(collider.center)).length() <= r) {
              var normal = nextTail.clone().subtract(collider.node.transformPoint(collider.center)).normalize();
              var posFromCollider = collider.node.transformPoint(collider.center).clone().add(normal.multiplyScalar(r));
              var temp = posFromCollider.subtract(this.m_transform.getWorldPosition()).normalize();
              nextTail = this.m_transform.getWorldPosition().clone().add(temp.multiplyScalar(this.m_length));
            }
          }

          return nextTail;
        };

        _createClass(VRMSpringBoneLogic2D, [{
          key: "Head",
          get: function get() {
            return this.m_transform;
          } // public get Tail() {
          //     // 待验证
          //     // get { return m_transform.localToWorldMatrix.MultiplyPoint(m_boneAxis * m_length); }
          //     // this.m_transform.local
          //     let dir = this.m_boneAxis.clone().multiplyScalar(this.m_length);
          //     let result = this.m_transform.getWorldPosition().clone().add(dir);
          //     let matrix = this.m_transform.getWorldMatrix();
          //     let result2 = dir.clone().transformMat4(matrix);
          //     console.log(result, result2);
          //     return result2
          // }

        }, {
          key: "ParentRotation",
          get: function get() {
            return this.m_transform.parent != null ? this.m_transform.parent.getWorldRotation() : Quat.IDENTITY;
          }
        }]);

        return VRMSpringBoneLogic2D;
      }());

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DragForceSlider.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './SwingBone.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Slider, Label, Component, SwingBone;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Slider = module.Slider;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      SwingBone = module.SwingBone;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "de8a4GDwLNJoKBOJsvKNvGY", "DragForceSlider", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var DragForceSlider = exports('DragForceSlider', (_dec = property(Slider), _dec2 = property(Label), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DragForceSlider, _Component);

        function DragForceSlider() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "slider", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = DragForceSlider.prototype;

        _proto.onLoad = function onLoad() {
          this.slider.progress = SwingBone.m_dragForce;
          this.label.string = "DragForce:" + this.slider.progress.toFixed(2);
        };

        _proto.onSliderMove = function onSliderMove() {
          SwingBone.m_dragForce = this.slider.progress;
          this.label.string = "DragForce:" + this.slider.progress.toFixed(2);
        };

        return DragForceSlider;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "slider", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TouchControl.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Node, Vec3, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "e0ee7NrMxlFZohhbQnyEijz", "TouchControl", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TouchControl = exports('TouchControl', (_dec = property(Node), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TouchControl, _Component);

        function TouchControl() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "rotateNode", _descriptor, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "isMouseDown", false);

          return _this;
        }

        var _proto = TouchControl.prototype;

        _proto.onLoad = function onLoad() {};

        _proto.start = function start() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this); // Editor.Selection.getSelected()
          // this.node.active
          // Editor.Message.request("scene", 'query-node', "");
        };

        _proto.onTouchStart = function onTouchStart(event) {
          this.isMouseDown = true;
        };

        _proto.onTouchMove = function onTouchMove(event) {
          if (!this.isMouseDown) return;
          if (!this.rotateNode) return;
          var delta = event.getDelta();
          var euler = this.rotateNode.eulerAngles;
          euler.add(new Vec3(0, delta.x, 0));
          this.rotateNode.setRotationFromEuler(euler);
        };

        _proto.onTouchEnd = function onTouchEnd(event) {
          this.isMouseDown = false;
        };

        return TouchControl;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "rotateNode", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CocosUtils.ts", ['cc'], function () {
  'use strict';

  var cclegacy, Node;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
    }],
    execute: function () {
      cclegacy._RF.push({}, "eff0dQrfddAC4GfMrlu1L/D", "CocosUtils", undefined);
      /*
       * @Author: yansixing
       * @Date: 2021-03-01 10:15:07
       * @Github: https://github.com/yansixing
       * @LastEditTime: 2021-03-09 17:32:29
       */


      Node.prototype.transformPoint = function (position) {
        var node = this;
        var matrix = node.getWorldMatrix();
        return position.clone().transformMat4(matrix); // return this.getWorldPosition().clone().add(position);
      }; // Node.prototype.traverse = function () {
      //     let node: Node = this;
      //     let outArr: Node[] = [];
      //     return outArr;
      // }


      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Tutorial.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Footer.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, cclegacy, _decorator, Component, Footer;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      Footer = module.Footer;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "f86a5wMIZZH5J1SW005WLcz", "Tutorial", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Tutorial = exports('Tutorial', (_dec = property(Footer), ccclass(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Tutorial, _Component);

        function Tutorial() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "pageIndex", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "footer", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "sceneName", void 0);

          return _this;
        }

        var _proto = Tutorial.prototype;

        _proto.onLoad = function onLoad() {
          console.log("Enter page:", this.pageIndex);
          this.footer.setup(this.pageIndex);
        };

        _proto.start = function start() {// this.sceneName = director.getScene().name;
        };

        return Tutorial;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pageIndex", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "footer", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./VRMSpringBoneLogic2D.ts', './SwingBone2D.ts', './TutorialManger.ts', './Footer.ts', './DemoScene.ts', './VRMSpringBoneLogic.ts', './SwingBone.ts', './SwingBoneToggle.ts', './StiffnessForceSlider.ts', './TSKit.ts', './ChainHead.ts', './Girl.ts', './BoneColliderGroup.ts', './DragForceSlider.ts', './TouchControl.ts', './CocosUtils.ts', './Tutorial.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map