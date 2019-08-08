import RCGroup from '../../RCGroup';

class ResiduesProcessor extends RCGroup {
  constructor(ResidueGroup, geoParams, complex, colorer, mode, polyComplexity, mask, material) {
    super();
    const self = this;
    this._complex = complex;
    const residues = complex.getResidues();
    const transforms = complex.getTransforms();

    complex.forEachComponent((component) => {
      let chunksCount = 0;
      const resIdc = [];
      component.forEachResidue((residue) => {
        if (self._checkResidue(residue, mask)) {
          resIdc[chunksCount++] = residue._index;
        }
      });

      if (chunksCount === 0) {
        return;
      }
      const residuesGroup = new ResidueGroup(geoParams, {
        residues,
        chunks: resIdc,
        parent: complex,
      }, colorer, mode, transforms, polyComplexity, material);
      residuesGroup._component = component;
      self.add(residuesGroup);
    });
  }

  checkResidue(residue, mask) {
    return residue._mask & mask;
  }

  getSubset(mask, innerOnly) {
    this.getSubsetProcessor(mask, innerOnly);
  }
}

export default ResiduesProcessor;
