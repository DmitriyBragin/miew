import RCGroup from '../../RCGroup';

class BondsProcessor extends RCGroup {
  constructor(BondsGroup, geoParams, complex, colorer, mode, polyComplexity, mask, material) {
    super();
    const self = this;
    this._complex = complex;
    const bonds = complex.getBonds();
    const transforms = complex.getTransforms();

    complex.forEachComponent((component) => {
      const bondsIdc = [];
      let bondsCount = 0;
      component.forEachBond((bond) => {
        const atom1 = bond._left;
        const atom2 = bond._right;
        if (!(atom1._mask & mask) || !(atom2._mask & mask)) {
          return;
        }
        bondsIdc[bondsCount++] = bond._index;
      });
      if (bondsCount === 0) {
        return;
      }
      const bondsGroup = new BondsGroup(geoParams, {
        bonds,
        chunks: bondsIdc,
        parent: complex,
      }, colorer, mode, transforms, polyComplexity, material);
      bondsGroup._component = component;
      self.add(bondsGroup);
    });
  }

  getSubset(mask, innerOnly) {
    this.getSubsetProcessor(mask, innerOnly);
  }
}

export default BondsProcessor;
