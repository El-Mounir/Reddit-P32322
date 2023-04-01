import { toolKeys } from './utilities';
import assert from 'assert';

describe("toolKeys" , ()=> {
    describe(".convertNumbers", () => {
        it("test if the output of 4560 is 4.5k",() => {
              
            const expected = "4.5k";
            const number = 4560;
            // testing the function
            
            const test = toolKeys.convertNumbers(number);
            
            //verification
    
            assert.strictEqual(test,expected);
        });
        it("test if the output of 456298764 is 456.2m",() => {
              
            const expected = "456.2m";
            const number = 456298764;
            // testing the function
            
            const test = toolKeys.convertNumbers(number);
            
            //verification
    
            assert.strictEqual(test,expected);
        })
        it("test if the output of 4060 is 4k",() => {
              
            const expected = "4k";
            const number = 4060;
            // testing the function
            
            const test = toolKeys.convertNumbers(number);
            
            //verification
    
            assert.strictEqual(test,expected);
        })
        it("test if the output of 456098764 is 456m",() => {
              
            const expected = "456m";
            const number = 456098764;
            // testing the function
            
            const test = toolKeys.convertNumbers(number);
            
            //verification
    
            assert.strictEqual(test,expected);
        })
        it("test if the output of 999 is 999",() => {
              
            const expected = "999";
            const number = 999;
            // testing the function
            
            const test = toolKeys.convertNumbers(number);
            
            //verification
    
            assert.strictEqual(test,expected);
        });
    });
});
