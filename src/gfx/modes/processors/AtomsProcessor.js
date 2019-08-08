import RCGroup from '../../RCGroup';

class AtomsProcessor extends RCGroup {
  constructor(AtomsGroup, geoParams, complex, colorer, mode, polyComplexity, mask, material) {
    super();
    const self = this;
    this._complex = complex;
    this._mode = mode;
    const atoms = complex.getAtoms();
    const transforms = complex.getTransforms();

    complex.forEachComponent((component) => {
      const atomsIdc = [];
      let atomCount = 0;
      component.forEachAtom((atom) => {
        if (!self._checkAtom(atom, mask)) {
          return;
        }
        atomsIdc[atomCount++] = atom._index;
      });
      if (atomCount === 0) {
        return;
      }
      const atomsGroup = new AtomsGroup(geoParams, {
        atoms,
        chunks: atomsIdc,
        parent: complex,
      }, colorer, mode, transforms, polyComplexity, material);
      atomsGroup._component = component;
      self.add(atomsGroup);
    });
  }

  _checkAtom(atom, mask) {
    return atom._mask & mask;
  }

  getSubset(mask, innerOnly) {
    this.getSubsetProcessor(mask, innerOnly);
  }
}

export default AtomsProcessor;
