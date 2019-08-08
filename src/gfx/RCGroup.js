import * as THREE from 'three';

class RCGroup extends THREE.Group {
  raycast(raycaster, intersects) {
    if (!this.visible) {
      return;
    }

    const { children } = this;
    for (let i = 0, n = children.length; i < n; ++i) {
      children[i].raycast(raycaster, intersects);
    }
  }

  enableSubset(mask, innerOnly) {
    const { children } = this;
    for (let i = 0, n = children.length; i < n; ++i) {
      if (children[i].enableSubset) {
        children[i].enableSubset(mask, innerOnly);
      }
    }
  }

  disableSubset(mask, innerOnly) {
    const { children } = this;
    for (let i = 0, n = children.length; i < n; ++i) {
      if (children[i].disableSubset) {
        children[i].disableSubset(mask, innerOnly);
      }
    }
  }

  isEmpty() {
    return this.children.length === 0;
  }

  updateToFrame(frameData) {
    const { children } = this;
    for (let i = 0, n = children.length; i < n; ++i) {
      if (children[i].updateToFrame) {
        children[i].updateToFrame(frameData);
      }
    }
  }

  getSubsetProcessor(mask, innerOnly) {
    const totalSubset = [];
    const { children } = this;
    let meshIdx = 0;
    for (let i = 0, n = children.length; i < n; ++i) {
      if (children[i].getSubset) {
        const chSubset = children[i].getSubset(mask, innerOnly);
        for (let j = 0, m = chSubset.length; j < m; ++j) {
          const subsetEl = chSubset[j];
          subsetEl._component = children[i]._component;
          totalSubset[meshIdx++] = subsetEl;
        }
      }
    }
    return totalSubset;
  }

  getSubset(mask, innerOnly) {
    const totalSubset = [];
    const { children } = this;
    for (let i = 0, n = children.length; i < n; ++i) {
      if (children[i].getSubset) {
        Array.prototype.push.apply(totalSubset, children[i].getSubset(mask, innerOnly));
      }
    }
    return totalSubset;
  }
}

export default RCGroup;
