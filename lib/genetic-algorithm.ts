interface Microservice {
  id: string;
  dependencies: string[];
  performance: number;
}

interface Architecture {
  services: Microservice[];
}

function mutate(architecture: Architecture): Architecture {
  const newArchitecture = JSON.parse(JSON.stringify(architecture));
  
  // Randomly split or merge services
  if (Math.random() < 0.5 && newArchitecture.services.length > 1) {
    // Merge two random services
    const index1 = Math.floor(Math.random() * newArchitecture.services.length);
    let index2 = Math.floor(Math.random() * (newArchitecture.services.length - 1));
    if (index2 >= index1) index2++;
    
    const mergedService = {
      id: `${newArchitecture.services[index1].id}_${newArchitecture.services[index2].id}`,
      dependencies: [...new Set([...newArchitecture.services[index1].dependencies, ...newArchitecture.services[index2].dependencies])],
      performance: (newArchitecture.services[index1].performance + newArchitecture.services[index2].performance) / 2
    };
    
    newArchitecture.services.splice(index1, 1);
    newArchitecture.services.splice(index2 - 1, 1);
    newArchitecture.services.push(mergedService);
  } else {
    // Split a random service
    const index = Math.floor(Math.random() * newArchitecture.services.length);
    const serviceToSplit = newArchitecture.services[index];
    
    const newService1 = {
      id: `${serviceToSplit.id}_1`,
      dependencies: serviceToSplit.dependencies.slice(0, Math.ceil(serviceToSplit.dependencies.length / 2)),
      performance: serviceToSplit.performance * (1 + (Math.random() - 0.5) * 0.2)
    };
    
    const newService2 = {
      id: `${serviceToSplit.id}_2`,
      dependencies: serviceToSplit.dependencies.slice(Math.ceil(serviceToSplit.dependencies.length / 2)),
      performance: serviceToSplit.performance * (1 + (Math.random() - 0.5) * 0.2)
    };
    
    newArchitecture.services.splice(index, 1, newService1, newService2);
  }
  
  return newArchitecture;
}

function crossover(parent1: Architecture, parent2: Architecture): Architecture {
  const child: Architecture = { services: [] };
  
  const length = Math.max(parent1.services.length, parent2.services.length);
  
  for (let i = 0; i < length; i++) {
    if (i < parent1.services.length && i < parent2.services.length) {
      child.services.push(Math.random() < 0.5 ? parent1.services[i] : parent2.services[i]);
    } else if (i < parent1.services.length) {
      child.services.push(parent1.services[i]);
    } else if (i < parent2.services.length) {
      child.services.push(parent2.services[i]);
    }
  }
  
  return child;
}

function evolve(population: Architecture[], generations: number): Architecture {
  for (let gen = 0; gen < generations; gen++) {
    const newPopulation: Architecture[] = [];
    
    // Elitism: keep the best architecture
    newPopulation.push(population.reduce((best, current) => 
      calculateFitness(current) > calculateFitness(best) ? current : best
    ));
    
    while (newPopulation.length < population.length) {
      const parent1 = selectParent(population);
      const parent2 = selectParent(population);
      let child = crossover(parent1, parent2);
      
      if (Math.random() < 0.1) { // 10% chance of mutation
        child = mutate(child);
      }
      
      newPopulation.push(child);
    }
    
    population = newPopulation;
  }
  
  return population.reduce((best, current) => 
    calculateFitness(current) > calculateFitness(best) ? current : best
  );
}

function calculateFitness(architecture: Architecture): number {
  // This is a simplified fitness function. In a real-world scenario,
  // this would take into account various performance metrics, dependencies, etc.
  return architecture.services.reduce((sum, service) => sum + service.performance, 0) / architecture.services.length;
}

function selectParent(population: Architecture[]): Architecture {
  // Tournament selection
  const tournamentSize = 3;
  let best = population[Math.floor(Math.random() * population.length)];
  for (let i = 1; i < tournamentSize; i++) {
    const contender = population[Math.floor(Math.random() * population.length)];
    if (calculateFitness(contender) > calculateFitness(best)) {
      best = contender;
    }
  }
  return best;
}

export { evolve, Architecture, Microservice };

